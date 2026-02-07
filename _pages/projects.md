---
layout: page
title: Projects
nav_title: projects
permalink: /projects/
description: A collection of my researching works and projects.
nav: true
nav_order: 3
display_categories: [work, fun]
horizontal: false
display_only_selected: true # 只显示 display: true 的项目，display: false 的隐藏
---

<!-- pages/projects.md -->
<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category }}</h2>
  </a>
  {% if page.display_only_selected %}
  {% assign categorized_projects = site.projects | where: "category", category | where: "display", true %}
  {% else %}
  {% assign categorized_projects = site.projects | where: "category", category %}
  {% endif %}
  {% assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}

{% else %}

<!-- Display projects without categories -->

{% if page.display_only_selected %}
  {% assign sorted_projects = site.projects | where: "display", true | sort: "importance" %}
  {% else %}
  {% assign sorted_projects = site.projects | sort: "importance" %}
  {% endif %}

  <!-- Generate cards for each project -->

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
{% endif %}
</div>
