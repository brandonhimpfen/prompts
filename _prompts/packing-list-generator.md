---
title: Packing list generator
description: Packing list based on weather + style.
key: packing_list
slug: packing-list-generator
category: travel
category_title: Travel & Planning
output_type: Checklist
difficulty: Beginner + Power
tags:
- packing
- travel
- checklist
featured: true
beginner: 'Create a packing list for my trip.


  Destination:

  [place]

  Days:

  [number]

  Season/weather:

  [info]

  Trip type:

  [city/outdoors/business]

  Laundry available:

  [yes/no]'
power: '<task>Create an optimized packing list.</task>


  <context>

  Destination: [place]

  Duration: [days]

  Weather: [temps/season]

  Trip type: [type]

  Laundry: [yes/no]

  </context>


  <constraints>

  - Avoid overpacking

  - Prioritize versatile items

  - Include “if needed” section

  </constraints>


  <output_format>

  Checklist grouped by:

  - Clothing

  - Shoes

  - Toiletries

  - Tech

  - Documents

  - Optional

  </output_format>'
---
