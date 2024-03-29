# book-search
MERN | Search from 100000 books | Backend Pagingation

![book_image_1](https://github.com/Suyash906/book-search/blob/main/screenshots/book_search_1.png)

![book_image_2](https://github.com/Suyash906/book-search/blob/main/screenshots/book_search_2.png)

![book_image_2](https://github.com/Suyash906/book-search/blob/main/screenshots/book_search_3.png)

## Tech Spec
- Backend - Node.js
- Frontend - React.js
- Database - MongoDB

## Steps to run the project
- **Backend**
  - cd server
  - run "npm install"
  - run "node index.js"
- **Frontend**
  - cd client
  - run "npm install"
  - run "npm start"

## Solution approach
- **Server-side Pagination** - I have assumed that only 12 books are displayed on the UI for any book name search. To make the search faster I have used backend pagination with the help of mongoose-paginate. It allows looking for the first 12 records that match the search criteria and return on the frontend. To look for the next 12 records, an API call is made with page parameter value 2.

- **Indexing on Column bookName** - I have created an index on _bookName_ column to improve the search speed.

- **Master-Slave architecture of DB** - MongoDB Atlas has been used to store data. 1 master and 2 slaves are offeres with the Atlas service. The reads are equally distributed among slave nodes. This helps to handle the concurrent read read requests better.

## Limitations and Assumptions
- Application has been tested with 100,000 records due to space constraints in Cloud DB.
- The books have been named in this format _<book_number>_book_name_, where book_number lies in range [1, 100,000].
- Script used to add data.
```
import requests
import random
url = 'http://localhost:3002'

for i in range(1, 1000001):
    try:
        author_name = "{}_author_name".format(random.randint(1, 50))
        book_name = "{}_book_name".format(i)
        request_data = {}
        request_data['authorName'] = author_name
        request_data['bookName'] = book_name

        x = requests.post(url, data = request_data)
    except:
        print(i)
        print("")
```

## Future Scope
- **Redis Caching** -  Cashing the API request with the result in database to speed up the response time.

## References
- https://github.com/bvaughn/infinite-list-reflow-examples/blob/master/books.json
- https://medium.com/swlh/server-side-pagination-in-node-js-with-sequelize-orm-and-mysql-73b0190e91fa (MySQL pagination)
- https://github.com/aravindnc/mongoose-paginate-v2  (MongoDB Pagination)
