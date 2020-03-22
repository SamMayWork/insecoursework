# UoP Forum Dictionary - Searching

There are 2 methods for searching for content, it only works for posts though, they are under the /get/search extension
  1. Searching for posts using their title (this is basically 1-1)
  2. Searching for posts using their keywords

(As of the build this documentation is included in, all of this functionality works)

Searching for posts using their title
endpoint: /get/search?type=post&searcterm=**[param]**

Returns content in the format:
``` JSON
{"post_id":"ad7e89d1","keyword_id":"2f64b1d3","board_id":"cfd5636c","post_title":"drawn tube heat bean","post_content":"classroom political history gradually exercise log introduced goes brought over art hollow won rabbit worker respect affect difference package greater first pilot be stems explore first these loud waste let recently slave hill war bone plant his care storm bend attached try forest army library manner happened half","post_likes":53,"user_id":"acc45ba4","created_date":"2020-02-21T00:00:00.000Z","edited_date":"2020-02-07T00:00:00.000Z"}
```

Searching for posts using their keywords (currently only works for 1 tag)
endpoint /get/search?type=post&searchtags=**[param]**

Returns content in the format
``` JSON
[{"post_id":"d0e039b3","keyword_id":"412fb90d","board_id":"330a35aa","post_title":"like as new hello","post_content":"plastic vast opinion position screenclimate treated alphabet bound many title becoming cool try oldest port own still thank worth being card close western nature make everybody tool including energy learn baseball clothes scientist until mud continued coast war tent powder worry lady breakfast wheel alike wealth ice cotton already nervous kill combine","post_likes":95,"user_id":"966abbd2","created_date":"2020-02-22T00:00:00.000Z","edited_date":"2020-02-28T00:00:00.000Z"}]
```