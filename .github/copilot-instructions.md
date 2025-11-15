# AI Coding Agent Instructions

## Overview
This repository contains user scripts, specifically designed for automating tasks. The current structure includes a `scripts/` directory with JavaScript files, such as `flaticon-svg-downloader.user.js`. These scripts are likely intended for browser automation or enhancing user workflows.

## Key Files and Directories
- **`scripts/`**: Contains the main user scripts. Each `.user.js` file is a standalone script, typically used with browser extensions like Tampermonkey or Greasemonkey.
  - Example: `flaticon-svg-downloader.user.js` appears to be a script for downloading SVG files from Flaticon.
- **`README.md`**: Provides a high-level overview of the repository.

## Project-Specific Conventions
- **File Naming**: Scripts follow the `.user.js` naming convention, which is standard for user scripts compatible with browser extensions.
- **Purpose**: Each script should have a clear, single-purpose functionality. For example, `flaticon-svg-downloader.user.js` is likely focused on downloading SVG assets.

## Development Workflow
1. **Editing Scripts**: Modify or create `.user.js` files in the `scripts/` directory.
2. **Testing**: Load the scripts into a browser extension like Tampermonkey to test functionality.
3. **Debugging**: Use browser developer tools (e.g., console logs) to debug issues.

## Examples and Patterns
- **Script Structure**: Each `.user.js` file should include metadata headers for compatibility with user script managers. For example:
  ```javascript
  // ==UserScript==
  // @name         Script Name
  // @namespace    http://example.com/
  // @version      1.0
  // @description  Brief description of the script
  // @author       Author Name
  // @match        https://example.com/*
  // @grant        none
  // ==/UserScript==

  (function() {
      'use strict';

      // Your code here...
  })();
  ```

## Notes for AI Agents
- Focus on maintaining the `.user.js` structure and metadata headers.
- Ensure scripts are self-contained and do not rely on external dependencies unless explicitly required.
- Follow the single-responsibility principle for each script.

## Future Enhancements
- Consider adding more detailed documentation for each script.
- Explore automated testing frameworks for user scripts.

---

If any section is unclear or incomplete, please provide feedback to refine these instructions.