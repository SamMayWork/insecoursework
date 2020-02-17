
Change list:
- Added basic README.md (may contain notes which are wrong in the future, beware)
- app.js
  - General
    - Decoupled Reece's testing data from the components
      - e.g. all Card() based components contained hard coded testing data to check the framework
        was rendering it's components based on the new virtual DOM design correctly
  - Revamped Component base class to be simpler
  - Renamed display() to render() [inspired by React...]
  - Navbar() changes
    - Added groups, buttons, menu buttons, dropdown options, save title bars
  - New List() components
    - List groups
    - List options
    - List toggle
    - List option text
    - List option datetime picker
      (NOTE: datetime is bundled with app UI, but no functionality to change value yet,
       just placeholder data values for now. Will add if needed in the future. Only needed
       for date searching but could use a simpler method than this)
- app.css
  - Added generic components
    - root
    - button
    - screen
    - navbar
    - list
      - list option
      - list inputs
        - text
        - toggle
        - dropdown
- Project Guidelines
  - Components
    - Constructor
      - Component Title & Options initialised
        - Title = Unique ID applied to component, its root element and possibly child
          components as unique identifier as component definition must be decoupled from the class definition
          to make it re-usable (i.e. very important for components such as posts as they are all independent)
        - Options = Generic properties used to initialise and/or change data which the component uses
                    If data is changed later, the view is automatically updated so data must never be edited
                    directly, after the component has been initialised. Data must only be changed via the
                    components interface
    - Render
      - The render function has two different states:
        1. The component is being initialised and must render its root element(s) and all of it's child components
           - When the component is initialised, it generally follows this process for rendering its root and child
             component elements
             1. Define a root element, change it's innerHTML if need be and set a root element. The root element
                of a component is usually the main element which has been created. However, sometimes that's not
                true, such as the navbar component which instead appends new components to its body as our
                design shows the same navbar on all screens aside from screens which edit data or the account screen
             2. Append the root element(s) to the parent element of the component. All components have parent components
                which also means all components don't rely on the framework, they're entirely independent and don't have
                to be part of the virtual DOM at all.
             3. Perform pre-order traversal through the component tree and render each element which is encountered
        2. Data which is coupled with the components view has been changed, and only the elements which relate to
           the changed data must be edited. This is similar to how React works, and ensures the components are
           lightweight (i.e. only some of the view is updated when some of the view is changed, rather than
           re-rendering entire components, parts are changed which is important for components which are large or
           need to be re-rendered often)