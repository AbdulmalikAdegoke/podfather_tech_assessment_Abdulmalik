# podfather_tech_assessment_Abdulmalik
My web app solution to the PODFather technical assessment- a proof of delivery data visualising web app

## The solution idea:
A web app that parses the data from the csv file to display as a table on the front end.
The functionalities to be included in the app: a search function, a filter function

## Features required:
### Must have
- Input field for searching
- Table for display of the data
### Should have
- Filter options
### Could have
- Graph visualisation
- Suggestive options for the search based on the chosen filter

## Considered potential users:
- Delivery Driver (primary user)
- Manager (primary user)
- Customer (secondary user)

## User stories:
- As a user I will like to be able to see the flagged deliveries and the late deliveries in an appropriate format (i.e. a table and optionally, a graph visualisation of the data)
- As a user I will also be able to view all the data from the file
- As a user I will like be able to view specific data from the file (filtering of data)
- As a user I will like to be able to search for specific data from the file

### Pre Requisites for this solution:
- HTML, CSS, JavaScript, JSON, AJAX
- Libraries: Papaparse (csv parsing)
- Frameworks: bootstrap (frontend)

### Self reflection: 
- Could have used Python and Django as initially planned as I was already familiar with the libraries available for data parsing in Python and the support for http requests using Django.
- For the implementation of the data search with my current approach, I should have began the development with a server implementation.

### Future ideas:
- Further polishing of the filtration to make the filter more column specfiic
- The implementation of a graph visualisation
