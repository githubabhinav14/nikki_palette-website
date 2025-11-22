# CSS Linting Configuration

This project uses Tailwind CSS with custom configuration to resolve linting warnings.

## Configuration Files

- **`.stylelintrc.json`**: Stylelint configuration that allows Tailwind CSS at-rules
- **`.vscode/settings.json`**: VS Code settings to disable default CSS validation and enable proper Tailwind support
- **`.vscode/extensions.json`**: Recommended extensions for optimal development experience

## Installed Dependencies

```bash
npm install --save-dev stylelint stylelint-config-standard
```

## VS Code Extensions

Recommended extensions for this project:
- **Tailwind CSS IntelliSense**: Provides autocomplete, syntax highlighting, and linting for Tailwind CSS
- **Stylelint**: Modern CSS/SCSS/Less linter

## What Was Fixed

The warnings were caused by the CSS linter not recognizing Tailwind CSS custom at-rules:
- `@tailwind` - Imports Tailwind CSS layers
- `@apply` - Applies utility classes in CSS
- `@layer` - Defines custom CSS layers

These are now properly configured and should not show as warnings.