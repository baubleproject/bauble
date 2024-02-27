#### Todos

- [x] Fix the Userbutton Issue
- [ ] Add a loader during profile fetching in all the components that fetch the profile
- [x] get a dashboard layout
- [ ] fix landing page layout
- [ ] fix carousel colors
- [x] map carousel data
- [x] carousel dark mode fix
- [ ] custom error page
- [ ] terms and condition page
- [ ] Privacy policy page
- [x] mobile sidebar
- [ ] when users signout and sign back in, it routes them to /signout


## Create task modal
    name: String
    priority: Priority (enum)
    project: Project (relation)
    projectId: String (corresponding to the id field in the Project model)
    assignedTo: Member (relation)
    memberId: String (corresponding to the id field in the Member model)
