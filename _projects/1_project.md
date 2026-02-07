---
layout: page
title: Bachelor’s Graduation Project
description: 
img: assets/img/g1.jpg
permalink: /projects/BEngraduation/
importance: 1
category: work
related_publications: false
display: true # true 显示在 projects 页和搜索中，false 隐藏
---

《Complex Motion Skill Learning and Generalization of Humanoid Robots Based on Imitation Learning and Reinforcement Learning》(Based on [ASAP](https://agile.human2humanoid.com/)).


Database: [AMASS](https://amass.is.tue.mpg.de/index.html)

<div class="row justify-content-sm-center">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Graduation/AMASS.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

After completing the SMPL shape and motion preparation, as well as the Humanoid-SMPL fitting and retargeting, I proceeded to train the policies. The results are shown below. The reference humanoid motions are displayed in MuJoCo, while the training results are simulated in Isaac Gym. Each policy was trained for approximately 15,000 to 20,000 iterations, taking about 15–20 hours on an RTX 3090.


<div class="row justify-content-sm-center">
    <div class="col-sm-3 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Graduation/jump.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Graduation/CR7.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-3 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Graduation/Mix_walk.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="caption">
    Left: Jump forward, Middle: CR7, Right: Walk. The yellow points are reference keypoints.
</div>


