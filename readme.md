# NetPress - ionic-react-news

This application was created with ionic using react and capacitor for demo purposes only.

The application displays the news separated by countries via NewsAPI. You can also assemble and collect your own RSS-Feeds.

If you want to try the application, you can use a developer key by registering an account with NewsAPI. If you want to use your application in production, you must upgrade your NewsAPI to a paid plan.

The Application uses serverless functions for the following tasks:

- fetch the news (this function hides the API key and acts as a Proxy)
- convert the RSS-Feeds from XML to JSON
- log errors to a firestore database
- weekly job which collects the error logs of the last week and sends a summary Email (optional)

These functions are currently deployed to Netlify.

## Resources

https://undraw.co/

https://flaticon.com/

## Images

<img src="https://raw.githubusercontent.com/Horbee/netpress/master/showcase/news.jpg"  />
<img src="https://raw.githubusercontent.com/Horbee/netpress/master/showcase/news2.jpg"  />
<img src="https://raw.githubusercontent.com/Horbee/netpress/master/showcase/rss-feed.jpg" />
<img src="https://raw.githubusercontent.com/Horbee/netpress/master/showcase/options.jpg" />
