# sn-toast https://www.sn-toast.xyz/

A beautiful, animated toast notification library for React with Tailwind CSS and Framer Motion.

## Features

- **Lightweight** — Simple API with minimal setup
- **Animated** — Smooth enter/exit animations powered by Framer Motion
- **Multiple types** — Success, error, warning, info, and normal variants
- **Customizable** — Configurable position, rich colors, and styling
- **TypeScript** — Full type definitions included

## Installation

```bash
npm install sn-toast@latest
```

### Peer Dependencies

- React >= 18.0.0
- React-DOM >= 18.0.0

## Quick Start

1. Add the `<Toaster />` component to your app root (e.g. `App.tsx`):

```tsx
import { Toaster } from 'sn-toast'

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      {/* Your app content */}
    </>
  )
}
```

2. Use the `toast` API anywhere in your app:

```tsx
import { toast } from 'sn-toast'

// Show notifications
toast.success('Operation completed!')
toast.error('Something went wrong')
toast.warning('Please check your input')
toast.info("Here's some information")
toast.normal('Just a message')
```

## API

### Toast Methods

| Method | Description |
|--------|-------------|
| `toast.success(message)` | Show a success toast |
| `toast.error(message)` | Show an error toast |
| `toast.warning(message)` | Show a warning toast |
| `toast.info(message)` | Show an info toast |
| `toast.normal(message)` | Show a normal/default toast |

### Toaster Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `"top-left" \| "top-right" \| "bottom-left" \| "bottom-right" \| "top-center" \| "bottom-center"` | `"bottom-right"` | Position of the toast container |
| `richColor` | `boolean` | `false` | Enable richer color variants |


MIT © [Mohamed elhaissan](https://github.com/mohamed-elhaissan)
