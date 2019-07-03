# Delux Bill Splitter

### This app aims to be an easy tool to split any bill or group of bills any way between any number of people.

## Contents
* [Links](#links)
* [Project Goals](#project-goals)
* [Action Plan](#action-plan)
* [Project Features](#project-features)
* [Technologies Used](#technologies-used)
* [Instructions for Use](#instructions-for-use)
* [Developer](#developer)

## Links
* Deployed page: [delux-bill-splitter.herokuapp.com](https://delux-bill-splitter.herokuapp.com/#!/)
* GitHub repository: [github.com/djknit/Delux-Bill-Splitter](https://github.com/djknit/Delux-Bill-Splitter)

## Project Goals
* This app aims to be an easy tool to split any bill or group of bills any way between any number of people.
* Use AngularJS for the front end. (This is my first major project built with AngularJS.)
* Modularize code as much as is practical.
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

## Action Plan
I am working to develop the basic functions on the front-end only. During this process, I will keep in mind that I plan to create a back-end and attempt to organize the data in a way that will make it easy to transfer state between the front and back ends.

Currently, I am working on the "Enter Bills" page which is where the most important logic necessary for the MVP is contained.

* [x] Create basic layout of page
* [x] Create functionality to add and remove participants from the list.
* [ ] Create functionality to add bill to list
  * [x] Create form (in modal)
  * [x] Bill Name section (design and implement with logic including updating state)
  * [x] Bill Total section
  * [x] Billers section
  * [ ] Responsible participants section
  * [ ] isPaid/paidBy section
* [ ] Create remove bill functionality
* [ ] Add logic to calculate bills
* [ ] Design results display

Try to fix the following bugs:

* [ ] `alert.css` appears to not be working

Consider the following possible improvements:

* [ ] Look for ways to remove repetition in form by creating more components and/or reorganizing components
* [ ] Create more services to handle data central to the app.
  * This should cut down on the amount of data that needs to be passed between components with bindings.
  * It should also make it easier to connect with API once back end is added.
* [ ] Improve UX of Add Bill form.
  * [ ] Disable "Biller", "Responsible Participants", and "Has this bill been paid?" sections until Bill Total has been set.
  * [ ] Consider breaking form in to pieces which would be displayed one at a time in the modal with butttons to move forwards and backwards through the steps.
  * [ ] Add helper text by fields to explain problems.
  * [ ] Consider adding more instructions/helper text, possibly using Bootstrap tooltips.

Once the above steps are complete, I will begin work on the back-end.

## Project Features
(Coming soon...)

## Technologies Used
#### Front End
* AngularJS
* Bootstrap
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