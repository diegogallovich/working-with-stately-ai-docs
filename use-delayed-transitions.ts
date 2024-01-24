import { createMachine, createActor } from 'xstate';

/*
    The following code does:
    1. Create a toggle machine
        1.1. Add a delay to the transition from Inactive to Active
    2. Create a toggle actor with the `toggleMachine`
    3. Subscribe toggle actor to state changes
    4. Start actor
    5. We send single event to activate the toggle and after 5 seconds the toggle will be deactivated because of the delayed transition applied
*/
// 1
const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'Inactive',
  states: {
    Inactive: {
      on: { toggle: 'Active' },
    },
    Active: {
      on: { toggle: 'Inactive' },
      after: {
        5000: 'Inactive',
      },
    },
  },
});

// 2
const toggleActor = createActor(toggleMachine);

// 3
toggleActor.subscribe((snapshot) => {
  console.log('Snapshot Value: ', snapshot.value);
});

// 4
toggleActor.start(); // => 'Inactive' (remember the initial state set up in the state machine ☝️)

// 5
toggleActor.send({ type: 'toggle' }); // => 'Active'
