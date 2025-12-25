# Scenario Player Issues - Analysis

## Issue 1: Double Dialogues When Starting

### Root Cause
The `showDialog` action in `ActionExecutor.js` doesn't properly await the dialog promise, causing all UI elements in the startup sequence to appear simultaneously.

**Current Flow:**
1. `onStart` actions execute in sequence via `executeSequence()`
2. `showDialog` emits 'dialog:alert' event and returns immediately (line 278-284 in ActionExecutor.js)
3. `showNotification` executes right away
4. `enterStage()` executes and shows Clippy message
5. All three UI elements appear nearly simultaneously → "double dialogues"

**Why it happens:**
```javascript
// ActionExecutor.js:274-285
async showDialog(params, context) {
    const { title, message, icon = 'info', buttons = ['OK'] } = params;

    // Emits event but doesn't wait for user interaction
    EventBus.emit('dialog:alert', { title, message, icon });

    // Returns immediately with first button - DOESN'T WAIT!
    return { button: buttons[0] || 'OK' };
}
```

The `SystemDialogs.showAlert()` method (line 812 in SystemDialogs.js) DOES return a Promise that resolves when the user clicks OK, but `ActionExecutor.showDialog()` doesn't capture or await this promise.

### Solution
Make `showDialog` actually wait for the dialog to be dismissed by using a callback pattern with EventBus or by making the dialog resolver accessible.

---

## Issue 2: No Clear Path to Win

### Investigation Results

**Events ARE being emitted correctly:**
- ✅ Minesweeper emits `minesweeper:win` (line 311 in Minesweeper.js)
- ✅ Calculator emits `calculator:result` with `value` field (lines 163, 184 in Calculator.js)

**Event names match scenarios:**
- ✅ Tutorial listens for `"minesweeper:win"` (tutorial.scenario.json:216)
- ✅ Cipher Hunt listens for `"calculator:result"` with condition checking `value === 88` (cipher-hunt.scenario.json:283-287)

**TriggerEngine is set up correctly:**
- ✅ Wraps EventBus.emit() to intercept all events (TriggerEngine.js:71-79)
- ✅ Handles event matching and condition evaluation
- ✅ Executes trigger actions including `completeScenario`

### Potential Issues Found

1. **Event Context Structure**: When events are emitted, they're wrapped with `name` field:
   ```javascript
   const context = {
       event: { name: eventName, ...data }  // Line 338 in TriggerEngine.js
   }
   ```
   This should work correctly with `eventMatch` condition evaluation.

2. **Subscription Timing**: Global triggers are registered BEFORE `TriggerEngine.start()` is called, so they don't get direct EventBus subscriptions. They rely on the EventBus.emit wrapping, which should work.

3. **Once Flag on Tutorial Triggers**: Some triggers in tutorial.scenario.json don't have `"once": true`, but the Minesweeper win trigger (line 214) doesn't specify it either. This means it could fire multiple times if the event is emitted multiple times.

### Most Likely Cause
The win conditions SHOULD work based on the code analysis. The issue might be:
- User testing before scenarios were fully loaded
- Browser console errors preventing event flow
- File loading issues with scenario JSON
- Event timing issues (app opened before scenario started)

### Recommended Fixes
1. Add debug logging to TriggerEngine to show when events are received and triggers fire
2. Verify semantic events are being used correctly in apps
3. Add visual feedback when triggers fire for debugging
4. Ensure scenario indicators show current stage and progress

---

## Summary of Required Fixes

### Priority 1: Double Dialogues (Breaking UX)
- [ ] Fix `showDialog` action to properly await dialog dismissal
- [ ] Ensure `showClippy` and `showNotification` respect dialog sequencing

### Priority 2: Win Condition Clarity (UX/Debug)
- [ ] Add console logging to TriggerEngine for debugging
- [ ] Add visual feedback for scenario progress
- [ ] Verify event emission in browser console
- [ ] Add "hints" or guidance text showing what the scenario is waiting for

### Priority 3: General Improvements
- [ ] Add scenario debugging mode
- [ ] Improve error messages when triggers don't fire
- [ ] Add event history viewer in scenario status dialog
