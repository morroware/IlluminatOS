# IlluminatOS! Scenario System

Complete documentation for creating interactive tutorials, guided experiences, and challenges using the IlluminatOS! scenario system.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Schema Reference](#schema-reference)
4. [Creating Scenarios](#creating-scenarios)
5. [Triggers & Events](#triggers--events)
6. [Conditions](#conditions)
7. [Actions](#actions)
8. [Semantic Events](#semantic-events)
9. [Examples](#examples)
10. [Best Practices](#best-practices)
11. [Troubleshooting](#troubleshooting)

---

## Overview

The IlluminatOS! **Scenario System** is a powerful JSON-driven framework for creating interactive, event-driven experiences. It allows you to create:

- **Interactive Tutorials** - Guided walkthroughs teaching OS features
- **Challenges & Puzzles** - Multi-stage cryptography hunts, escape rooms, etc.
- **Scripted Demonstrations** - Automated showcases of features
- **Educational Content** - Step-by-step learning experiences

### Key Features

✨ **Event-Driven Architecture** - React to user actions in real-time
🎯 **Multi-Stage Progression** - Break complex scenarios into stages
💡 **Hint System** - Context-sensitive help with configurable delays
📊 **Progress Tracking** - Auto-save scenario state across sessions
🔧 **Flexible Conditions** - Complex logic for progression requirements
⚡ **Powerful Actions** - Manipulate files, windows, UI, and more
📝 **JSON Schema** - Structured, validated scenario definitions

---

## Architecture

### Core Components

| Component | Location | Purpose |
|-----------|----------|---------|
| **ScenarioManager** | `/core/scripted-events/ScenarioManager.js` | Orchestrates scenario execution |
| **ScenarioLoader** | `/core/scripted-events/ScenarioLoader.js` | Loads and validates scenario files |
| **TriggerEngine** | `/core/scripted-events/TriggerEngine.js` | Manages event triggers |
| **ConditionEvaluator** | `/core/scripted-events/ConditionEvaluator.js` | Evaluates progression conditions |
| **ActionExecutor** | `/core/scripted-events/ActionExecutor.js` | Executes scenario actions |
| **SemanticEvents** | `/core/scripted-events/SemanticEvents.js` | App-specific event definitions |

### Data Flow

```
Scenario JSON File
    ↓
ScenarioLoader validates & parses
    ↓
ScenarioManager initializes scenario
    ↓
TriggerEngine registers event listeners
    ↓
User performs action → Event fires
    ↓
TriggerEngine checks event against triggers
    ↓
ConditionEvaluator checks if conditions met
    ↓
ActionExecutor performs actions (advance stage, show dialog, etc.)
    ↓
ScenarioManager updates progress → Save to localStorage
    ↓
Repeat until scenario completes
```

---

## Schema Reference

Scenarios are defined in JSON format following the schema at `/scenarios/schema.json`.

### Root Structure

```json
{
  "id": "unique-scenario-id",
  "name": "Scenario Display Name",
  "version": "1.0.0",
  "author": "Author Name",
  "description": "What this scenario teaches/does",
  "difficulty": "easy|medium|hard",
  "estimatedTime": "5-10 minutes",

  "requirements": {
    "apps": ["notepad", "calculator"],
    "features": ["soundsystem"]
  },

  "config": {
    "allowSkip": true,
    "showProgress": true,
    "autoSave": true,
    "enableHints": true,
    "pauseOnBlur": false
  },

  "variables": {
    "score": 0,
    "attempts": 0
  },

  "stages": [ /* Stage definitions */ ],
  "globalTriggers": [ /* Always-active triggers */ ],

  "onStart": [ /* Actions on scenario start */ ],
  "onComplete": [ /* Actions on completion */ ],
  "onFail": [ /* Actions on failure */ ],
  "onAbort": [ /* Actions on abort */ ]
}
```

### Stage Structure

```json
{
  "id": "stage-1",
  "name": "Stage Name",
  "description": "What the user should do",

  "onEnter": [ /* Actions when entering stage */ ],
  "onExit": [ /* Actions when leaving stage */ ],

  "hints": [
    {
      "delay": 30000,
      "message": "Hint after 30 seconds",
      "action": "showNotification"
    }
  ],

  "triggers": [
    {
      "id": "trigger-1",
      "event": "file:created",
      "conditions": [ /* Conditions to check */ ],
      "actions": [ /* Actions to perform */ ],
      "once": true
    }
  ]
}
```

### Metadata Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique scenario identifier |
| `name` | string | ✅ | Display name |
| `version` | string | ✅ | Semantic version (e.g., "1.0.0") |
| `author` | string | ❌ | Creator name/email |
| `description` | string | ✅ | Brief description |
| `difficulty` | enum | ❌ | "easy", "medium", "hard" |
| `estimatedTime` | string | ❌ | Human-readable time estimate |
| `tags` | array | ❌ | Categorization tags |

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `allowSkip` | boolean | `true` | Allow users to skip stages |
| `showProgress` | boolean | `true` | Show progress indicator |
| `autoSave` | boolean | `true` | Auto-save progress |
| `enableHints` | boolean | `true` | Show hints after delays |
| `pauseOnBlur` | boolean | `false` | Pause when window loses focus |

---

## Creating Scenarios

### Step 1: Create Scenario File

Create a JSON file in `/scenarios/` with `.scenario.json` extension:

```json
{
  "id": "my-first-scenario",
  "name": "My First Scenario",
  "version": "1.0.0",
  "description": "A simple introductory scenario",
  "difficulty": "easy",

  "config": {
    "allowSkip": false,
    "showProgress": true
  },

  "variables": {
    "tasksCompleted": 0
  },

  "stages": [
    {
      "id": "welcome",
      "name": "Welcome",
      "description": "Click the Start button to begin",

      "triggers": [
        {
          "id": "start-clicked",
          "event": "startmenu:opened",
          "actions": [
            {
              "type": "advanceStage",
              "stage": "open-notepad"
            }
          ],
          "once": true
        }
      ]
    },
    {
      "id": "open-notepad",
      "name": "Open Notepad",
      "description": "Launch Notepad from the Start Menu",

      "onEnter": [
        {
          "type": "showNotification",
          "title": "Task",
          "message": "Open Notepad from Start → Programs → Accessories"
        }
      ],

      "triggers": [
        {
          "id": "notepad-opened",
          "event": "app:launched",
          "conditions": [
            {
              "type": "eventMatch",
              "key": "appId",
              "value": "notepad"
            }
          ],
          "actions": [
            {
              "type": "modifyState",
              "key": "tasksCompleted",
              "operation": "increment"
            },
            {
              "type": "completeScenario"
            }
          ],
          "once": true
        }
      ],

      "hints": [
        {
          "delay": 15000,
          "message": "Click the Start button, then Programs → Accessories → Notepad",
          "action": "showNotification"
        }
      ]
    }
  ],

  "onComplete": [
    {
      "type": "showDialog",
      "title": "Congratulations!",
      "message": "You completed your first scenario!",
      "dialogType": "info"
    },
    {
      "type": "unlockAchievement",
      "achievementId": "first-scenario"
    }
  ]
}
```

### Step 2: Load Scenario

Scenarios are automatically discovered in the `/scenarios/` directory. Launch via:

- **Scenario Player App** - GUI interface for selecting scenarios
- **Terminal Command** - `scenario start my-first-scenario`
- **Programmatically** - `ScenarioManager.startScenario('my-first-scenario')`

---

## Triggers & Events

### Trigger Structure

```json
{
  "id": "unique-trigger-id",
  "event": "event-name",
  "conditions": [ /* Optional conditions */ ],
  "actions": [ /* Actions to perform */ ],
  "once": true,
  "debounce": 500,
  "priority": 0
}
```

### Trigger Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique trigger identifier |
| `event` | string | ✅ | Event name to listen for |
| `conditions` | array | ❌ | Conditions that must be true |
| `actions` | array | ✅ | Actions to execute |
| `once` | boolean | ❌ | Fire only once (default: false) |
| `debounce` | number | ❌ | Debounce delay in ms |
| `priority` | number | ❌ | Execution priority (higher = first) |

### Available Events

#### Window Events
- `window:opened` - Window created
- `window:closed` - Window closed
- `window:focused` - Window gained focus
- `window:minimized` - Window minimized
- `window:maximized` - Window maximized
- `window:resized` - Window size changed

#### App Events
- `app:launched` - App started
- `app:closed` - App closed
- `notepad:file-opened` - Notepad opened file
- `notepad:file-saved` - Notepad saved file
- `calculator:result` - Calculator computed result
- `terminal:command-executed` - Terminal ran command

#### Desktop Events
- `desktop:icon-doubleclicked` - Icon double-clicked
- `desktop:icon-deleted` - Icon deleted
- `recyclebin:emptied` - Recycle bin emptied
- `startmenu:opened` - Start menu opened

#### File System Events
- `file:created` - File created
- `file:modified` - File modified
- `file:deleted` - File deleted
- `directory:created` - Directory created

#### System Events
- `boot:complete` - System finished booting
- `achievement:unlocked` - Achievement unlocked
- `setting:changed` - Setting modified

See `/core/scripted-events/SemanticEvents.js` for complete list.

---

## Conditions

Conditions determine when triggers fire and stages advance. All conditions in an array must be true (AND logic).

### Condition Structure

```json
{
  "type": "conditionType",
  "key": "keyName",
  "value": "expectedValue"
}
```

### Stage Conditions

```json
{
  "type": "stageActive",
  "stageId": "welcome"
}
```

```json
{
  "type": "stageCompleted",
  "stageId": "intro"
}
```

### State Conditions

```json
{
  "type": "stateEquals",
  "key": "score",
  "value": 100
}
```

```json
{
  "type": "stateGreater",
  "key": "attempts",
  "value": 5
}
```

```json
{
  "type": "stateContains",
  "key": "items",
  "value": "key"
}
```

### File System Conditions

```json
{
  "type": "fileExists",
  "path": ["C:", "Users", "User", "Documents", "readme.txt"]
}
```

```json
{
  "type": "fileContains",
  "path": ["C:", "Users", "User", "Documents", "secret.txt"],
  "content": "password123"
}
```

### App Conditions

```json
{
  "type": "appOpen",
  "appId": "calculator"
}
```

```json
{
  "type": "appFocused",
  "appId": "notepad"
}
```

### Window Conditions

```json
{
  "type": "windowExists",
  "windowId": "notepad-1"
}
```

### Time Conditions

```json
{
  "type": "timeElapsed",
  "duration": 60000
}
```

```json
{
  "type": "timeBefore",
  "timestamp": 1700000000000
}
```

### Event Conditions

```json
{
  "type": "eventMatch",
  "key": "appId",
  "value": "calculator"
}
```

```json
{
  "type": "eventData",
  "key": "result",
  "operator": "greaterThan",
  "value": 100
}
```

### Logic Conditions

```json
{
  "type": "and",
  "conditions": [
    { "type": "stageActive", "stageId": "stage-1" },
    { "type": "fileExists", "path": ["C:", "test.txt"] }
  ]
}
```

```json
{
  "type": "or",
  "conditions": [
    { "type": "appOpen", "appId": "notepad" },
    { "type": "appOpen", "appId": "paint" }
  ]
}
```

```json
{
  "type": "not",
  "condition": {
    "type": "windowExists",
    "windowId": "help"
  }
}
```

### Complete Condition Reference

| Condition Type | Parameters | Description |
|----------------|------------|-------------|
| `stageActive` | `stageId` | Current stage matches |
| `stageCompleted` | `stageId` | Stage has been completed |
| `stateEquals` | `key`, `value` | State value equals |
| `stateExists` | `key` | State key exists |
| `stateGreater` | `key`, `value` | State value greater than |
| `stateLess` | `key`, `value` | State value less than |
| `stateContains` | `key`, `value` | Array/string contains value |
| `stateMatches` | `key`, `pattern` | Regex match |
| `fileExists` | `path` | File exists at path |
| `fileContains` | `path`, `content` | File contains text |
| `fileEquals` | `path`, `content` | File content exactly matches |
| `appOpen` | `appId` | App is running |
| `appFocused` | `appId` | App window is active |
| `appLocked` | `appId` | App is locked |
| `windowExists` | `windowId` | Window exists |
| `windowMinimized` | `windowId` | Window is minimized |
| `achievementUnlocked` | `achievementId` | Achievement unlocked |
| `featureEnabled` | `featureId` | Feature is enabled |
| `timeElapsed` | `duration` | Time passed since trigger |
| `timeBefore` | `timestamp` | Current time before timestamp |
| `timeAfter` | `timestamp` | Current time after timestamp |
| `eventMatch` | `key`, `value` | Event data field matches |
| `eventData` | `key`, `operator`, `value` | Event data comparison |
| `random` | `probability` | Random chance (0-1) |
| `count` | `triggerId`, `operator`, `value` | Trigger fire count |
| `and` | `conditions` | All conditions true |
| `or` | `conditions` | Any condition true |
| `not` | `condition` | Condition is false |
| `compare` | `left`, `operator`, `right` | Compare two values |
| `inRange` | `value`, `min`, `max` | Value in range |
| `always` | - | Always true |
| `never` | - | Always false |

---

## Actions

Actions are executed when triggers fire or stages change.

### Action Structure

```json
{
  "type": "actionType",
  "parameter": "value"
}
```

### File System Actions

```json
{
  "type": "createFile",
  "path": ["C:", "Users", "User", "Documents", "welcome.txt"],
  "content": "Welcome to IlluminatOS!"
}
```

```json
{
  "type": "modifyFile",
  "path": ["C:", "Users", "User", "Documents", "data.txt"],
  "content": "Updated content",
  "append": false
}
```

```json
{
  "type": "deleteFile",
  "path": ["C:", "Users", "User", "Desktop", "temp.txt"]
}
```

```json
{
  "type": "createFolder",
  "path": ["C:", "Users", "User", "MyFolder"]
}
```

### Desktop Actions

```json
{
  "type": "createDesktopIcon",
  "icon": {
    "id": "my-file",
    "label": "My File",
    "icon": "📄",
    "type": "file",
    "path": ["C:", "Users", "User", "Desktop", "file.txt"]
  }
}
```

```json
{
  "type": "removeDesktopIcon",
  "iconId": "my-file"
}
```

### UI Actions

```json
{
  "type": "showDialog",
  "title": "Important",
  "message": "You found the secret!",
  "dialogType": "info"
}
```

```json
{
  "type": "showNotification",
  "title": "Task Complete",
  "message": "Great job!",
  "duration": 3000
}
```

```json
{
  "type": "showClippy",
  "message": "Need help? Click here for a hint!",
  "options": ["Show Hint", "No Thanks"]
}
```

### Audio Actions

```json
{
  "type": "playSound",
  "sound": "achievement"
}
```

```json
{
  "type": "playAudio",
  "src": "path/to/audio.mp3",
  "volume": 0.8,
  "loop": false
}
```

```json
{
  "type": "stopAudio",
  "src": "path/to/audio.mp3"
}
```

### App Actions

```json
{
  "type": "unlockApp",
  "appId": "secretapp"
}
```

```json
{
  "type": "lockApp",
  "appId": "calculator"
}
```

```json
{
  "type": "launchApp",
  "appId": "notepad",
  "params": {
    "filePath": ["C:", "readme.txt"]
  }
}
```

```json
{
  "type": "closeApp",
  "appId": "paint"
}
```

### System Actions

```json
{
  "type": "unlockAchievement",
  "achievementId": "puzzle-master"
}
```

```json
{
  "type": "setState",
  "key": "score",
  "value": 100
}
```

```json
{
  "type": "modifyState",
  "key": "attempts",
  "operation": "increment",
  "amount": 1
}
```

```json
{
  "type": "emitEvent",
  "event": "custom:event",
  "data": {
    "message": "Something happened"
  }
}
```

### Navigation Actions

```json
{
  "type": "advanceStage",
  "stage": "next-stage-id"
}
```

```json
{
  "type": "completeScenario"
}
```

```json
{
  "type": "failScenario",
  "reason": "Time ran out"
}
```

### Effect Actions

```json
{
  "type": "visualEffect",
  "effect": "confetti",
  "duration": 3000
}
```

```json
{
  "type": "setWallpaper",
  "image": "url/to/image.png"
}
```

```json
{
  "type": "triggerScreensaver"
}
```

### Control Actions

```json
{
  "type": "wait",
  "duration": 2000
}
```

```json
{
  "type": "showHint",
  "hint": "Look in the Documents folder"
}
```

```json
{
  "type": "enableFeature",
  "featureId": "desktop-pet"
}
```

```json
{
  "type": "disableFeature",
  "featureId": "screensaver"
}
```

### Complete Action Reference

| Action Type | Parameters | Description |
|-------------|------------|-------------|
| `createFile` | `path`, `content` | Create file with content |
| `modifyFile` | `path`, `content`, `append` | Modify/append to file |
| `deleteFile` | `path` | Delete file |
| `createFolder` | `path` | Create directory |
| `createDesktopIcon` | `icon` | Add desktop icon |
| `removeDesktopIcon` | `iconId` | Remove desktop icon |
| `showDialog` | `title`, `message`, `dialogType` | Show modal dialog |
| `showNotification` | `title`, `message`, `duration` | Show toast notification |
| `showClippy` | `message`, `options` | Show Clippy assistant |
| `playSound` | `sound` | Play system sound |
| `playAudio` | `src`, `volume`, `loop` | Play audio file |
| `stopAudio` | `src` | Stop audio file |
| `unlockApp` | `appId` | Make app available |
| `lockApp` | `appId` | Hide app from menus |
| `launchApp` | `appId`, `params` | Launch application |
| `closeApp` | `appId` | Close all app windows |
| `unlockAchievement` | `achievementId` | Unlock achievement |
| `setState` | `key`, `value` | Set scenario state |
| `modifyState` | `key`, `operation`, `amount` | Modify state (increment/decrement) |
| `emitEvent` | `event`, `data` | Emit custom event |
| `advanceStage` | `stage` | Move to next stage |
| `completeScenario` | - | Mark scenario complete |
| `failScenario` | `reason` | Mark scenario failed |
| `visualEffect` | `effect`, `duration` | Trigger visual effect |
| `setWallpaper` | `image` | Change desktop background |
| `triggerScreensaver` | - | Start screensaver |
| `wait` | `duration` | Pause execution |
| `showHint` | `hint` | Display hint message |
| `enableFeature` | `featureId` | Enable feature |
| `disableFeature` | `featureId` | Disable feature |
| `log` | `message` | Log to console (debug) |

---

## Semantic Events

Semantic events provide app-specific event data for precise triggering.

### Example: Calculator Events

```json
{
  "id": "calculate-42",
  "event": "calculator:result",
  "conditions": [
    {
      "type": "eventMatch",
      "key": "result",
      "value": 42
    }
  ],
  "actions": [
    {
      "type": "showDialog",
      "title": "Correct!",
      "message": "The answer to life, the universe, and everything!",
      "dialogType": "info"
    }
  ]
}
```

### Example: Terminal Events

```json
{
  "id": "ls-command",
  "event": "terminal:command-executed",
  "conditions": [
    {
      "type": "eventMatch",
      "key": "command",
      "value": "ls"
    }
  ],
  "actions": [
    {
      "type": "setState",
      "key": "learnedLS",
      "value": true
    }
  ]
}
```

### Example: File Events

```json
{
  "id": "secret-file-created",
  "event": "file:created",
  "conditions": [
    {
      "type": "eventMatch",
      "key": "path",
      "value": "C:/Users/User/Desktop/secret.txt"
    }
  ],
  "actions": [
    {
      "type": "advanceStage",
      "stage": "decode-message"
    }
  ]
}
```

---

## Examples

### Example 1: Simple Tutorial

```json
{
  "id": "basic-tutorial",
  "name": "Desktop Basics",
  "version": "1.0.0",
  "description": "Learn to use the desktop",
  "difficulty": "easy",
  "estimatedTime": "3 minutes",

  "stages": [
    {
      "id": "open-start-menu",
      "name": "Open Start Menu",
      "description": "Click the Start button",

      "triggers": [
        {
          "id": "start-opened",
          "event": "startmenu:opened",
          "actions": [
            {
              "type": "showNotification",
              "title": "Great!",
              "message": "You opened the Start Menu!"
            },
            {
              "type": "advanceStage",
              "stage": "launch-calculator"
            }
          ],
          "once": true
        }
      ]
    },
    {
      "id": "launch-calculator",
      "name": "Launch Calculator",
      "description": "Open Calculator from the Start Menu",

      "triggers": [
        {
          "id": "calc-launched",
          "event": "app:launched",
          "conditions": [
            { "type": "eventMatch", "key": "appId", "value": "calculator" }
          ],
          "actions": [
            { "type": "completeScenario" }
          ],
          "once": true
        }
      ]
    }
  ],

  "onComplete": [
    {
      "type": "showDialog",
      "title": "Tutorial Complete!",
      "message": "You've learned the basics!",
      "dialogType": "info"
    }
  ]
}
```

### Example 2: Challenge Scenario

```json
{
  "id": "math-challenge",
  "name": "The Math Puzzle",
  "version": "1.0.0",
  "description": "Solve the mathematical mystery",
  "difficulty": "medium",

  "variables": {
    "answer": 0,
    "attempts": 0
  },

  "stages": [
    {
      "id": "intro",
      "name": "Introduction",
      "description": "Read the challenge file",

      "onEnter": [
        {
          "type": "createFile",
          "path": ["C:", "Users", "User", "Desktop", "challenge.txt"],
          "content": "Calculate 6 * 7 using the Calculator app"
        },
        {
          "type": "showNotification",
          "title": "Challenge Started",
          "message": "Check the challenge.txt file on your desktop"
        }
      ],

      "triggers": [
        {
          "id": "file-opened",
          "event": "notepad:file-opened",
          "conditions": [
            {
              "type": "eventData",
              "key": "filePath",
              "operator": "contains",
              "value": "challenge.txt"
            }
          ],
          "actions": [
            { "type": "advanceStage", "stage": "solve" }
          ],
          "once": true
        }
      ]
    },
    {
      "id": "solve",
      "name": "Solve the Puzzle",
      "description": "Calculate the answer",

      "triggers": [
        {
          "id": "check-answer",
          "event": "calculator:result",
          "conditions": [
            { "type": "eventMatch", "key": "result", "value": 42 }
          ],
          "actions": [
            { "type": "setState", "key": "answer", "value": 42 },
            { "type": "playSound", "sound": "achievement" },
            { "type": "completeScenario" }
          ],
          "once": true
        },
        {
          "id": "wrong-answer",
          "event": "calculator:result",
          "conditions": [
            {
              "type": "not",
              "condition": { "type": "eventMatch", "key": "result", "value": 42 }
            }
          ],
          "actions": [
            { "type": "modifyState", "key": "attempts", "operation": "increment" },
            { "type": "showNotification", "title": "Incorrect", "message": "Try again!" }
          ]
        }
      ],

      "hints": [
        {
          "delay": 30000,
          "message": "Use the Calculator: 6 * 7",
          "action": "showNotification"
        }
      ]
    }
  ],

  "onComplete": [
    {
      "type": "showDialog",
      "title": "Success!",
      "message": "You found the answer to life, the universe, and everything!",
      "dialogType": "info"
    },
    {
      "type": "unlockAchievement",
      "achievementId": "hitchhiker"
    }
  ]
}
```

---

## Best Practices

### 1. Stage Design

✅ **DO:**
- Keep stages focused on single tasks
- Provide clear descriptions
- Use meaningful stage IDs
- Progress logically from simple to complex

❌ **DON'T:**
- Create overly complex stages
- Skip providing descriptions
- Rely on stage order without explicit navigation

### 2. Conditions

✅ **DO:**
- Use specific conditions for clarity
- Combine conditions with AND/OR for complex logic
- Test edge cases

❌ **DON'T:**
- Overcomplicate condition logic
- Assume user behavior
- Forget to handle failure cases

### 3. Actions

✅ **DO:**
- Provide immediate feedback
- Chain actions logically
- Clean up created resources

❌ **DON'T:**
- Create files without cleanup plan
- Spam notifications
- Block user indefinitely

### 4. User Experience

✅ **DO:**
- Provide hints for stuck users
- Show progress indicators
- Allow skipping if appropriate
- Give positive reinforcement

❌ **DON'T:**
- Leave users without guidance
- Make scenarios too linear
- Punish experimentation

### 5. Testing

✅ **DO:**
- Test all paths through scenario
- Verify conditions trigger correctly
- Check cleanup on abort/fail
- Test with fresh browser session

❌ **DON'T:**
- Test only happy path
- Ignore edge cases
- Skip cleanup testing

---

## Troubleshooting

### Scenario Won't Load

**Problem:** Scenario doesn't appear in Scenario Player
**Solutions:**
1. Check JSON syntax validity
2. Ensure file has `.scenario.json` extension
3. Verify schema compliance
4. Check browser console for errors

### Triggers Not Firing

**Problem:** Expected trigger doesn't execute
**Solutions:**
1. Verify event name matches semantic event
2. Check conditions are satisfied
3. Ensure trigger is in active stage
4. Check if `once: true` and already fired
5. Enable debug mode: `ScenarioManager.enableDebug(true)`

### Conditions Not Met

**Problem:** Conditions never evaluate to true
**Solutions:**
1. Log event data: Check what data is actually emitted
2. Verify condition syntax
3. Check for typos in keys/values
4. Test conditions in isolation

### Actions Not Executing

**Problem:** Trigger fires but actions don't work
**Solutions:**
1. Check action syntax
2. Verify action type is valid
3. Ensure required parameters provided
4. Check browser console for errors
5. Verify actions are properly ordered

### Progress Not Saving

**Problem:** Scenario progress doesn't persist
**Solutions:**
1. Check `autoSave: true` in config
2. Verify localStorage is enabled
3. Check for localStorage quota errors
4. Clear old scenario data

### Debugging Commands

```javascript
// In browser console

// Enable scenario debug logging
ScenarioManager.enableDebug(true);

// Get current scenario state
ScenarioManager.getCurrentScenario();

// Get scenario progress
ScenarioManager.getProgress('scenario-id');

// Manually advance stage
ScenarioManager.advanceStage('stage-id');

// Check trigger status
TriggerEngine.getActiveTriggers();

// Evaluate condition manually
ConditionEvaluator.evaluate(conditionObject, context);
```

---

## Advanced Topics

### Custom Event Types

You can emit custom events for scenario-specific interactions:

```javascript
// In app code
import EventBus from './core/EventBus.js';

EventBus.emit('custom:puzzle-solved', {
    puzzleId: 'cipher-1',
    solution: 'SECRET',
    attempts: 3
});
```

```json
{
  "id": "puzzle-trigger",
  "event": "custom:puzzle-solved",
  "conditions": [
    { "type": "eventMatch", "key": "solution", "value": "SECRET" }
  ],
  "actions": [
    { "type": "advanceStage", "stage": "next-puzzle" }
  ]
}
```

### Dynamic Content

Use scenario variables for dynamic content:

```json
{
  "type": "showDialog",
  "title": "Progress Report",
  "message": "You've completed {{tasksCompleted}} out of {{totalTasks}} tasks!",
  "dialogType": "info"
}
```

### Branching Scenarios

Create multiple paths based on user choices:

```json
{
  "id": "choice",
  "name": "Make a Choice",
  "description": "Choose your path",

  "onEnter": [
    {
      "type": "showDialog",
      "title": "Choose",
      "message": "Do you want the red file or blue file?",
      "dialogType": "question",
      "options": ["Red", "Blue"]
    }
  ],

  "triggers": [
    {
      "id": "chose-red",
      "event": "dialog:choice",
      "conditions": [
        { "type": "eventMatch", "key": "choice", "value": "Red" }
      ],
      "actions": [
        { "type": "advanceStage", "stage": "red-path" }
      ]
    },
    {
      "id": "chose-blue",
      "event": "dialog:choice",
      "conditions": [
        { "type": "eventMatch", "key": "choice", "value": "Blue" }
      ],
      "actions": [
        { "type": "advanceStage", "stage": "blue-path" }
      ]
    }
  ]
}
```

---

## Additional Resources

- **Schema File:** `/scenarios/schema.json` - Complete JSON schema definition
- **Example Scenarios:** `/scenarios/` - Tutorial and Cipher Hunt examples
- **Semantic Events:** `/core/scripted-events/SemanticEvents.js` - All available events
- **API Documentation:** Source code comments in `/core/scripted-events/` modules

---

<div align="center">

**Create amazing interactive experiences with the IlluminatOS! Scenario System**

*Happy Scenario Building! 🎯*

</div>
