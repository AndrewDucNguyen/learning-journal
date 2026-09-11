# Working with APIs

## Intro
Most powerful thing in software development is being able to fetch data from a server and displaying it creatively. Many cases, a server exists solely for that purpose or that specific site.

## Lesson overview
Topics we will learn:
- Explain what an API is
- Explain broadly how access to an API works
- Explain how to fetch and extract data from an API
- Explain why your API request might be blocked by the browser, and how to fix this

## APIs
Servers created to provide functionality and serve data for external use often do so using APIs (`Application Programming Interface`)

There are multiple ways to request data from an API, but they all do the same thing basically.

APIs are ypically accessed through URLs, and the specifics of how to query these URLs will change based on the URL being used. These are typically documented on the service's website

In most cases, you will have to create an account and request an "API key" fomr the API service before attempting ot fetch data from their endpoints

- Endpoints are specific URls that you can use to access a particular function or data within the API.
- API keys are random and unique to you.
- Services can correlate your API key to your requests of their data, including how much and how often you are requesting. This allows API service to better track abuse of their systems and data.
- API keys are also ways to mitigate and recuperate operating costs since servers running for APIs cost money.
- Because API key is your key to these services and data, we need to make sure we secure them and make that a habit.

## Fetching data
A couple of years ago, the main way to access API data in your code was using `XMLHttpRequest`. This still works, but its not particularly nice to use.

```js
// Just getting XHR is a mess!
if (window.XMLHttpRequest) { // Mozilla, Safari, ...
  request = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE
  try {
    request = new ActiveXObject('Msxml2.XMLHTTP');
  }
  catch (e) {
    try {
      request = new ActiveXObject('Microsoft.XMLHTTP');
    }
    catch (e) {}
  }
}

// Open, send.
request.open('GET', 'https://url.com/some/url', true);
request.send(null);
```

Writing XML request like this was painful, so develpers created libraries such as `axios` and `superagent`

The more recent/new native function for making HTTP requests is using fetch:

```js
// URL (required), options (optional)
fetch('https://url.com/some/url')
  .then(function(response) {
    // Successful response :)
  })
  .catch(function(err) {
    // Error :(
  });
```

You will see things that a familiar from promises `.then()` and `.catch()`