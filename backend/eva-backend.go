package main

import (
	"encoding/csv"
	"encoding/json"
	"github.com/gofrs/uuid"
	"github.com/gorilla/mux"
	"github.com/robfig/cron"
	"gopkg.in/yaml.v2"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"
)

var config = ConfigFile{}

func main() {
	data, _ := ioutil.ReadFile("config.yaml")
	err := yaml.Unmarshal(data, &config)
	if err != nil {
		panic("Can't load config")
	}
	config.SharedSecret = os.Getenv("SHARED_SECRET")
	config.DokuWikiUser = os.Getenv("DOKU_WIKI_USER")
	config.DokuWikiPassword = os.Getenv("DOKU_WIKI_PASSWORD")

	updateDecentralizedServicesList()

	c := cron.New()
	err = c.AddFunc("@hourly", func() {
		loadSpaceData()
		getCalendars()
		updateDecentralizedServicesList()
	})
	if err != nil {
		log.Printf("Can't start cron %v", err)
	} else {
		c.Start()
	}

	router := NewRouter()
	http.Handle("/", router)
	log.Fatal(http.ListenAndServe(":8080", router))
}

func getJson(url string, target interface{}) error {
	r, err := http.Get(url)
	if err != nil {
		return err
	}
	defer r.Body.Close()

	return json.NewDecoder(r.Body).Decode(target)
}

func SpaceDataIndex(w http.ResponseWriter, r *http.Request) {
	ReturnJson(w, readSpacedata())
}

func SpaceUrlIndex(w http.ResponseWriter, r *http.Request) {
	ReturnJson(w, readSpaceurl())
}

func CalendarIndex(w http.ResponseWriter, r *http.Request) {
	ReturnJson(w, readCalendar())
}

func DecentralizedServicesIndex(w http.ResponseWriter, r *http.Request) {
	ReturnJson(w, readServices())
}

func SpaceUrlAdd(w http.ResponseWriter, r *http.Request) {
	spaceUrl := SpaceUrl{}
	createEntry(&spaceUrl, w, r)
	spaceUrl.Validated = false

	generatedUuid, err := uuid.NewV4()
	if err != nil {
		log.Printf("%v", err)
		w.WriteHeader(500)
	} else {
		spaceUrl.Id = generatedUuid.String()
		writeSpaceurl(spaceUrl)
	}
}

func SpaceUrlUpdate(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	SharedSecret := vars["SharedSecret"]
	if SharedSecret == config.SharedSecret {
		spaceUrl := SpaceUrl{}
		createEntry(&spaceUrl, w, r)
		updateSpaceurl(spaceUrl)
	}
}

func SpaceUrlDelete(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	SharedSecret := vars["SharedSecret"]
	Id := vars["id"]
	if SharedSecret == config.SharedSecret {
		err := deleteSpaceurl(Id)
		if err != nil {
			w.WriteHeader(500)
		} else {
			w.WriteHeader(204)
		}
	} else {
		w.WriteHeader(401)
	}
}

func loadSpaceData() {
	spaceUrls := readSpaceurl()

	timestamp := time.Now().Unix()

	for _, spaceUrl := range spaceUrls {
		if spaceUrl.Validated && int64(spaceUrl.LastUpdated+60) < timestamp {
			spaceData := SpaceData{}
			err := getJson(spaceUrl.Url, &spaceData)
			if err != nil {
				log.Println(spaceUrl.Url)
				log.Println(err)
			} else {
				writeSpaceData(spaceData)

				spaceUrl.LastUpdated = timestamp
				updateSpaceurl(spaceUrl)
			}
		}
	}
}

func refreshData(w http.ResponseWriter, r *http.Request) {
	loadSpaceData()
	getCalendars()

	w.WriteHeader(204)
}

func updateDecentralizedServicesList() {
	client := &http.Client{}
	req, err := http.NewRequest("GET", "https://doku.ccc.de/index.php?title=Spezial:Ask&x=-5B-5BKategorie%3ADienste-5D-5D%2F-3FService-2DName%3DName%2F-3FService-2DProduct%3DProdukt%2F-3FService-2DIs-2DCentralized%3DZentralisiert%2F-3FService-2DVisibility%3DSichtbarkeit%2F-3FService-2DOrg%3DOrganisation%2F-3FService-2DType%3DTyp%2F-3FService-2DURL%3DURL%2F-3FService-2DContact%3DKontakt%2F-3FService-2DCheck-23ISO%3DOnline-20Check%2F-3FService-2DState%3DOnline-3F%2F-3FService-2DEncryption%3DVerschl%C3%BCsselung%2F-3FService-2DHas-2DIPv4%3DIPv4%2F-3FService-2DHas-2DIPv6%3DIPv6&mainlabel=-&limit=50&offset=0&format=csv&headers=show&searchlabel=CSV&default=%21no%20result%21&sep=%3B&valuesep=%3B&filename=dienste.csv", nil)
	if err != nil{
		log.Fatal(err)
	}
	req.SetBasicAuth(config.DokuWikiUser, config.DokuWikiPassword)
	resp, err := client.Do(req)
	if err != nil{
		log.Fatal(err)
	}

	r := csv.NewReader(resp.Body)
	r.Comma = ';'

	var DecentrealizedServiceList []DecentrealizedService
	for {
		record, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}

		if record[3] == "public" && record[9] == "wahr" &&  record[6] != "" {
			foo := DecentrealizedService{
				record[0],
				record[1],
				record[6],
			}

			DecentrealizedServiceList = append(DecentrealizedServiceList, foo)
		}
	}

	writeDecentralizedServices(DecentrealizedServiceList)
}

type DecentrealizedService struct {
	Name	string	`json:"name"`
	Type	string	`json:"type"`
	Url		string	`json:"url"`
}
