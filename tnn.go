package main

import (
	"github.com/pashanskiy/tnn/components"
)

func main() {
	components.CreateFolders()
	db, err := components.OpenDB()
	check(err)
	components.HTTPServer(db)
}


func check(e error) {
	if e != nil {
		panic(e)
	}
}
