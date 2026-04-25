# npm
- Package manager
- A gigantic repository of plugins, libraries, and other tools that we can install using the command line
- Use this because we don't want to manage a bunch of js files ourselves

## package.json
- npm resolves around a file calles `package.json`
    - This is a JSON file that contains informatoin about our project
    - name, any dependencies, and their version number
```json
{
  "name": "curriculum",
  "version": "1.0.0",
  "description": "[The Odin Project](https://www.theodinproject.com/) (TOP) is an open-source curriculum for learning full-stack web development. Our curriculum is divided into distinct courses, each covering the subject language in depth. Each course contains a listing of lessons interspersed with multiple projects. These projects give users the opportunity to practice what they are learning, thereby reinforcing and solidifying the theoretical knowledge learned in the lessons. Completed projects may then be included in the user's portfolio.",
  "scripts": {
    "lint": "markdownlint-cli2",
    "fix": "markdownlint-cli2 --fix"
  },
  "license": "CC BY-NC-SA 4.0",
  "devDependencies": {
    "markdownlint-cli2": "^0.12.1"
  }
}
```