--- 
layout: default
--- 
{% for post in site.posts limit:5 %}
  <div class="post_summery">
    <h4 class="news_date"><a href="{{ post.url }}">{{ post.title }} - {{ post.date | date_to_string }}</a></h4>
    {% capture blob %}{{ post.content | strip_html | strip_newlines | truncate: 450 }}{% endcapture %}
    <p class="news_text blob">{{ blob }}</p>
    <p class="news_more">
    {% if site.enableDisqusComments %}
        <a class="comment" href="{{ post.url }}#disqus_thread">comment</a>
        {% if blob.size >= 450 %} : {% endif %}
    {% endif %}
        <a class="more" href="{{ post.url }}">
        {% if blob.size >= 450 %}Read More &raquo;{% else %}View{% endif %}
        </a>
    </p>
    <!-- <p align="right">&raquo; <a href="#">back to top</a></p> -->
  </div>
{% endfor %}
