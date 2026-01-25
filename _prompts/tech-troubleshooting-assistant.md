---
title: Tech troubleshooting assistant
description: Ask questions and walk me through fixes.
key: tech_troubleshoot
slug: tech-troubleshooting-assistant
category: tech
category_title: Tech Help
output_type: Troubleshooting
difficulty: Beginner + Power
tags:
- tech
- troubleshooting
- support
featured: true
beginner: 'Help me troubleshoot this tech issue.

  Ask clarifying questions first, then guide me step-by-step.


  Problem:

  [describe problem]

  Device/app:

  [info]'
power: '<task>Diagnose and troubleshoot the issue systematically.</task>


  <constraints>

  - Ask up to 7 clarifying questions first

  - Provide step-by-step troubleshooting tree

  - Include "what to try next" if a step fails

  - Avoid risky steps unless clearly labeled

  </constraints>


  <output_format>

  1) Clarifying questions

  2) Probable causes (ranked)

  3) Step-by-step fixes

  4) Prevention tips

  </output_format>


  <input>

  Problem: [describe]

  Environment: [OS/device/app/version]

  </input>'
---
