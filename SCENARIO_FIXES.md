# Scenario Player Fixes

## Issues Fixed

### 1. ✅ Double Dialogues on Startup

**Problem:** When starting a scenario, multiple UI elements (dialog, notification, Clippy) appeared simultaneously, creating a confusing "double dialogue" effect.

**Root Cause:** The `showDialog` action was emitting an event and returning immediately without waiting for the user to dismiss the dialog.

**Fix Applied:**
- Modified `ActionExecutor.js` `showDialog()` action to return a Promise that waits for the dialog to be dismissed
- Modified `SystemDialogs.js` `resolveAlert()` to emit a `'dialog:alert:closed'` event when the dialog is closed
- Now the scenario properly waits for each dialog to be dismissed before continuing to the next action

**Files Changed:**
- `core/scripted-events/ActionExecutor.js` (lines 274-294)
- `features/SystemDialogs.js` (line 858)

---

### 2. ✅ Win Condition Debugging

**Problem:** Users couldn't tell if win conditions were working or why they weren't completing scenarios.

**Analysis:** The win conditions ARE correctly configured:
- Minesweeper emits `minesweeper:win` event ✓
- Calculator emits `calculator:result` event with `value` field ✓
- TriggerEngine listens for these events ✓
- Conditions are properly configured ✓

**Fix Applied:**
Added comprehensive debug logging to TriggerEngine to help diagnose issues:
- Logs every event received when debug mode is enabled
- Shows which triggers match each event
- Displays condition evaluation results (PASS/FAIL)
- Shows event data when conditions fail
- Logs when triggers fire and complete

**Files Changed:**
- `core/scripted-events/TriggerEngine.js` (lines 329-343, 456-496, 503-533)

**How to Enable Debug Mode:**
1. Open the Control Panel → Features
2. Find "Scenario Manager"
3. Enable "Debug Mode" setting
4. Check browser console while playing scenarios

---

## How to Test the Fixes

### Test 1: Tutorial Scenario (Double Dialogue Fix)

1. Open ScenarioPlayer app
2. Start the "IlluminatOS Tutorial"
3. **Expected Behavior:**
   - You see the "Welcome to IlluminatOS!" dialog
   - Click "Let's Go!" to dismiss it
   - ONLY AFTER dismissing, you see the notification and Clippy message
   - NO overlapping dialogs or simultaneous messages

4. **Win Condition:**
   - Follow the tutorial steps
   - Open Minesweeper (Start > Programs > Games > Minesweeper)
   - Win a game of Minesweeper
   - Tutorial should complete and show "Tutorial Complete!" dialog

### Test 2: Cipher Hunt Scenario (Win Condition)

1. Open ScenarioPlayer app
2. Start "The Cipher Hunt"
3. **Enable Debug Mode** (Control Panel > Features > Scenario Manager > Debug Mode)
4. Open browser console (F12)
5. Complete the scenario:
   - Read MYSTERY.txt
   - Decode clue_1.txt (Caesar cipher: answer is 3)
   - Decode clue_2.txt (Binary 101010 = 42)
   - Solve clue_3.txt (7×8 - 5×3 + 2 = 43)
   - Use Calculator to compute: 3 + 42 + 43 = 88
6. **Expected Behavior:**
   - Console shows `[TriggerEngine] Event received: calculator:result` with value 88
   - Console shows `[TriggerEngine] 🔥 FIRING trigger "final-code"`
   - Scenario completes and shows "SECRET CODE: 88" dialog

### Test 3: Debug Logging

With Debug Mode enabled, you should see in the console:
```
[TriggerEngine] Event received: minesweeper:started {...}
[TriggerEngine] Found 1 matching trigger(s) for minesweeper:started: ["game-started"]
[TriggerEngine] 🔥 FIRING trigger "game-started" with 1 action(s)
[TriggerEngine] ✓ Trigger "game-started" completed
```

---

## Troubleshooting

### If win conditions still don't work:

1. **Enable Debug Mode** and check console for:
   - Are events being received? Look for `[TriggerEngine] Event received:`
   - Are triggers matching? Look for `Found X matching trigger(s)`
   - Are conditions failing? Look for `✗ FAIL` with event data shown

2. **Common Issues:**
   - **Event not received:** App might not be emitting the semantic event
   - **No matching triggers:** Event name mismatch or trigger not registered for current stage
   - **Condition fails:** Event data doesn't match expected value (check event data in console)

3. **Check scenario is running:**
   - Look for scenario indicator in taskbar (🎬 icon)
   - Click it to see scenario status

4. **Restart scenario:**
   - Stop current scenario (click indicator > Abort)
   - Start it again from ScenarioPlayer

---

## For Developers

### Adding New Win Conditions

To add a new win condition to a scenario:

1. **Ensure the app emits the correct event:**
   ```javascript
   import EventBus from '../core/EventBus.js';
   import { YourAppEvents } from '../core/scripted-events/SemanticEvents.js';

   // When win condition is met:
   EventBus.emit(YourAppEvents.WIN, {
       score: finalScore,
       time: elapsedTime
   });
   ```

2. **Add trigger to scenario JSON:**
   ```json
   {
       "id": "win-trigger",
       "event": "yourapp:win",
       "conditions": {
           "type": "eventMatch",
           "field": "score",
           "op": "greaterThan",
           "value": 100
       },
       "actions": [
           { "type": "completeScenario" }
       ]
   }
   ```

3. **Test with debug mode** to verify event data structure

### Dialog Sequencing

To ensure dialogs appear in sequence:
- Use `showDialog` for important messages that should block
- Use `showNotification` for non-blocking info messages
- Use `showClippy` for hints that can appear alongside other content

The `executeSequence()` function will wait for each action to complete before starting the next one.

---

## Summary of Changes

| File | Change | Impact |
|------|--------|--------|
| `core/scripted-events/ActionExecutor.js` | Make showDialog wait for dismissal | Fixes double dialogues ✓ |
| `features/SystemDialogs.js` | Emit dialog closed event | Required for dialog wait ✓ |
| `core/scripted-events/TriggerEngine.js` | Add debug logging | Easier win condition debugging ✓ |
| `SCENARIO_ISSUES_ANALYSIS.md` | Document root causes | Reference documentation ✓ |
| `SCENARIO_FIXES.md` | This file | Testing guide ✓ |

All changes are backward compatible and don't break existing functionality.
