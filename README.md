# github-search-api-webapp
This repo contains a simple web app to search for users and organizations in GitHub.

To correctly run the application, create `properties.ts` under `app/src` folder and copy the following:

```
export const gitHubToken = '<YOUR_TOKEN>';
```

Be sure to grant `read:user` and `read:org` rules when generating a new personal token.  
You can generate a personal access token [here](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).
