## App scripts

- Run: `npm run start` / `ng serve`
- Tests + coverage: `npm run test`
- Coverage only: `npm run coverage`

## App utils

- Unit test: Jest + mockBuilder
- Store management: NgRx store + NgRx effects 
- Styling: Bootstrap

## App features

- Smart / dump components: 

Separation of Concerns:

Smart Components: Manage data fetching, state, and business logic.
Dumb Components: Focus on rendering UI based on props or inputs.
Reusability:

Dumb components are easily reusable across different parts of the application.
Testability:

Dumb components are simpler to test as they are pure and only depend on props.
Simplified Development:

Clear separation allows developers to focus on either UI design (dumb components) or logic and state management (smart components).
Enhanced Readability and Maintainability:

Each component has a single responsibility, making the codebase more organized and easier to maintain.
Performance Optimization:

Dumb components can be optimized to avoid unnecessary re-renders.
Improved Collaboration:

Different team members can work on smart and dumb components concurrently, enhancing productivity.
Simplified Debugging:

Debugging is easier with a clear separation between state management and UI rendering.
In summary, this approach leads to cleaner, more modular, and maintainable code, improving overall development efficiency and application performance.

- NgRx store + adapter:
  Simplified Reducer Logic:

Entity Adapters provide predefined reducer functions (addOne, addAll, updateOne, removeOne, etc.), reducing boilerplate code and simplifying the reducer logic.
Consistency:

Ensures a consistent approach to handling collections of entities throughout the application.
Performance:

Optimized for handling large collections of entities efficiently.
Keeps the state normalized, which helps in faster lookup and updates.
Readability and Maintainability:

Reduces the amount of code and makes it more readable and maintainable.
Clear separation between different entity operations.



