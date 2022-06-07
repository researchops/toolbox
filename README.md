![A toolbox with a branded research operations sticker on it](https://dev.toolbox-8w7.pages.dev/favicon.png)

# ResearchOps Toolbox

## Introduction

Check it out at [toolbox.researchops.community](https://toolbox.researchops.community/)

This is a community-based project focused on creating and maintaining a resource for researchers and research operations specialists that will empower people to find out not only what tools are being used, but also in which industry, by what size of teams, and where in the world.

Our hope is that this will help researchers and ReOps specialists with tool audits, comparative analyses, and the evaluation and justification of specific research tools. Ultimately, we want to make the tool evaluation and selection process easier and save hundreds of hours for researchers, ReOps specialists, and those who support research.

This is made by researchers & ReOps-ers, for researchers & ReOps-ers. This is a grassroots volunteer effort with no product sponsorship or affiliation. 

## Feedback and getting involved

We are continuously collecting data and improving the toolbox. 

You can visit our [public roadmap](https://airtable.com/shrY8frhGknYfiR2x) and [github project](https://github.com/orgs/researchops/projects/1/views/2)

If you have any feedback or would like to get involved, you can submit it through our [contact form](https://airtable.com/shrK5MQBUElp9xjLs) or reach out to us at tools.census@researchops.community

## What we have

- A snappy front-end framework [SvelteKit](https://kit.svelte.dev/)
- Deployment on [Cloudflare](https://www.cloudflare.com/)
- [Airtable](https://www.airtable.com/) database 
- [Figma](figma.com/) mockups and graphics    

## Quick start

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

To create and run a local Node version of your app:

```bash
npm run start
```

## Contributing

Make a pull request.


## Editing Content

Descriptions and other editorial content in the app is stored in Markdown. The following instrucionts will allow anyone to edit content on the Github website and then submit a pull request for a project team member to approve.

### Instructions:
1. Navigate to https://github.com/researchops/toolbox/tree/dev/src/routes (ensure you are in the dev branch).
2. Navigate to the page you want to edit (like design-collaboration.svx)
3. Edit file by **clicking the pencil** icon
4. Use markdown syntax to make changes (guidelines found [on markdownguide.org](https://www.markdownguide.org/basic-syntax/))
5. Scroll down to Commit Changes and select the **Create a new branch** option. 
6. Name the new branch and **click propose change**.
7. Click **Create pull request**
8. Add a reviewer in the conversation tab or notify a collaborator in chat.
9. Optionally **click the Checks tab** to view a branch deploy of your changes.
10. Delete the branch.
11. Wait till a scheduled release to publish the changes to production or request an off cycle release. 

