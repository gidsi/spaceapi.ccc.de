package main

type ConfigFile struct {
	SharedSecret    string `yaml:"shared_secret,omitempty"`
	MongoDbServer   string `yaml:"mongodb_server,omitempty"`
	MongoDbDatabase string `yaml:"mongodb_database,omitempty"`
}