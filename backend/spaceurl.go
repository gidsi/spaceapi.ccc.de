package main

type SpaceUrl struct {
	Id          string `json:"id"`
	Url         string `json:"url"`
	Validated   bool   `json:"validated"`
	LastUpdated int64  `json:"lastUpdated"`
}
