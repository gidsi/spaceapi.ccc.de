package main

// non standard should start with ext_

type Location struct {
	Address string `json:"address"`
	// non standard
	ExtFloor int     `json:"ext_floor"`
	Lon      float32 `json:"lon"`
	Lat      float32 `json:"lat"`
}

type SpaceFed struct {
	SpaceNet   bool `json:"spacenet"`
	Spacesaml  bool `json:"spacesaml"`
	SpacePhone bool `json:"spacephone"`
}

type Stream struct {
	M4      bool `json:"m4,omitempty"`
	MJPEG   bool `json:"mjpeg,omitempty"`
	UStream bool `json:"ustream,omitempty"`
}

type State struct {
	Open          bool    `json:"open"`
	Lastchange    float64 `json:"lastchange,omitempty"`
	TriggerPerson string  `json:"trigger_person,omitempty"`
	Message       string  `json:"message,omitempty"`
	Icon          struct {
		Open   string `json:"open"`
		Closed string `json:"closed"`
	} `json:"icon,omitempty"`
}

type Contact struct {
	Twitter   string `json:"twitter"`
	Phone     string `json:"phone"`
	Irc       string `json:"irc"`
	Email     string `json:"email"`
	Ml        string `json:"ml"`
	IssueMail string `json:"issue_mail"`
}

type Feed struct {
        Type string `json:"type"`
        Url string `json:"url"`
}

type Feeds struct {
	Blog     Feed `json:"blog"`
	Wiki     Feed `json:"wiki"`
	Calendar Feed `json:"calendar"`
}

// main struct

type SpaceData struct {
	Api      string   `json:"api"`
	Space    string   `json:"space"`
	Logo     string   `json:"logo"`
	Url      string   `json:"url"`
	Location Location `json:"location"`
	SpaceFed SpaceFed `json:"spacefed,omitempty"`
	Cam      []string `json:"cam,omitempty"`
	Stream   *Stream  `json:"stream,omitempty"`
	State    State    `json:"state"`
	// missing: `json:"events,omitempty"`
	Contact             *Contact `json:"contact,omitempty"`
	IssueReportChannels []string `json:"issue_report_channels"`
	// missing: `json:"sensors,omitempty"`
	Feeds Feeds `json:"feeds,omitempty"`
	// missing: `json:"cache,omitempty"`
	Projects []string `json:"projects,omitempty"`
	// missing: `json:"radio_show,omitempty"`
	// not in spaceapi.io/docs
	Ext_ccc string `json:"ext_ccc"`
}
