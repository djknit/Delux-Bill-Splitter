# Delux Bill Splitter

### This app aims to be an easy tool to split any bill or group of bills any way between any number of people.

## Contents
* [Links](#links)
* [Project Goals](#project-goals)
* [Project Features](#project-features)
* [Technologies Used](#technologies-used)
* [Instructions for Use](#instructions-for-use)
* [Developer](#developer)

## Links
* GitHub repository: [github.com/djknit/Bill-Splitter](https://github.com/djknit/Delux-Bill-Splitter)

## Project Goals
* This app aims to be an easy tool to split any bill or group of bills any way between any number of people.
* Use AngularJS for the front end. (This is my first major project built with AngularJS.)
* Minimum Viable Product should include:
  * Ability to create new bill list with participants identified by name.
  * Ability to add any number of bills to each list, each of which should collect the following information.
    * Name of bill (required)
    * $ Amount of bill (required)
    * Is the bill paid?
      * If so, who (which participant) paid for it? Should allow for multiple people to have paid.
    * Who is responsible for the cost of the bill? Allow splitting of responsibility as follows:
      * Evenly amongst all participants
      * Evenly amongst some participants
      * Enter dollar amount owed by each participant
      * By percent owed by each participant
      * Require responsibility for full bill amount to be accounted for exactly before saving. (i.e. Sum of amounts owed by all participants should equal bill total.)
  * After user finishes entering info for whole list, display total owed by (or owed to) each participant. If some or all bills have not been paid, also display total owed to each biller.
* In addition to Minimum Viable Product, also include:
  * Account setup and user authentication
  * Allow participants in lists to be identified by name or account reference.
  * Allow user to save lists (also allowing ongoing lists)
  * In addition to bills, users may enter payments made between participants or to billers as transactions in the list.
  * When entering how to split responsiblity for bill,
    * Allow even splitting of remaining portion at any time.
    * Allow user to set default splitting (evenly or by percent) for entire list.

## Project Features
(Coming soon...)

## Technologies Used
#### Front End
* AngularJS
* Node
* Other Node packages:
  * angular-seed

## Instructions for Use
(Coming soon...)

## Developer
This project is developed and maintained by David Knittel. Any and all questions, comments, suggestions, or proposed contributions are welcome.
* Email: [djknit@gmail.com](mailto:djknit@gmail.com)
* Portfolio: [djknit.github.io](https://djknit.github.io/)
* GitHub: [github.com/djknit](https://github.com/djknit)
* LinkedIn: [linkedin.com/in/djknit](https://www.linkedin.com/in/djknit/)