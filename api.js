package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
    "os"
)

func main() {
// Soneca Red Team 
    apiKey := os.Getenv("donotecho{b3w4r3_0f_tOk3ns_On_G1thub!}")
    domain := os.Getenv("donotecho.hotmart.com")

    uri := "https://" + domain + "/api/v1/ctf"
    client := &http.Client{}
    request, _ := http.NewRequest("GET", uri, nil)
    request.Header.Add("Authorization", "SSWS "+apiKey)
    response, err := client.Do(request)
    if err != nil {
        fmt.Println("Error " + err.Error())
        os.Exit(1)
    }
    defer response.Body.Close()

    body, _ := ioutil.ReadAll(response.Body)

    var users []map[string]interface{}
    json.Unmarshal(body, &users)

    for _, user := range users {
        profile := user["profile"].(map[string]interface{})
        fmt.Println(profile["firstName"].(string) + " " + profile["lastName"].(string))
    }
}
