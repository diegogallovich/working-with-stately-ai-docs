import { createMachine, createActor } from 'xstate';

/*
    The following code does:
    1. Create a toggle machine
    2. Create a toggle actor with the `toggleMachine`
    3. Subscribe toggle actor to state changes
    4. Start actor
    5. Send events to the actor (As a test we send 3 events to see the state changes through snapshots logged to the console)
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
    },
  },
});

// 2
const toggleActor = createActor(toggleMachine);

// 3
toggleActor.subscribe(snapshot => {
    console.log("Snapshot Value", snapshot.value);
});

// 4
toggleActor.start(); // => 'Inactive' (remember the initial state set up in the state machine ☝️)

// 5
toggleActor.send({ type: 'toggle' }); // => 'Active'
toggleActor.send({ type: 'toggle' }); // => 'Inactive'

