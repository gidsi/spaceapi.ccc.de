package main

import (
        "net/http"
        "encoding/json"
        "gopkg.in/yaml.v2"
        "log"
        "io/ioutil"
        "os"
        "time"
        "github.com/gorilla/mux"
)

var config = ConfigFile{}

func main() {
        data, _ := ioutil.ReadFile("config.yaml")
        yaml.Unmarshal(data, &config)
        config.SharedSecret = os.Getenv("SHARED_SECRET")

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

func SpaceUrlAdd(w http.ResponseWriter, r *http.Request) {
        spaceUrl := SpaceUrl{}
        createEntry(&spaceUrl, w, r)
        spaceUrl.Validated = false
        writeSpaceurl(spaceUrl)
}

func SpaceUrlUpdate(w http.ResponseWriter, r *http.Request) {
        vars := mux.Vars(r)
        SharedSecret := vars["SharedSecret"]
        if(SharedSecret == config.SharedSecret) {
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
		deleteSpaceurl(Id)
	}
}

func loadSpaceData() {
        spaceUrls := readSpaceurl()

        timestamp := time.Now().Unix()

        for _, spaceUrl := range spaceUrls {
                if(spaceUrl.Validated && int64(spaceUrl.LastUpdated + 60) < timestamp) {
                        spaceData := SpaceData{}
                        err := getJson(spaceUrl.Url, &spaceData)
                        if(err != nil)
                        {
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
