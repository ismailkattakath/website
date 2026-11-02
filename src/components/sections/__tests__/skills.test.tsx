import { render, screen } from '@testing-library/react'
import Skills from '@/components/sections/skills'

jest.mock('framer-motion', () => {
  const motionMock = {
    div: ({
      children,
      variants,
      initial,
      animate,
      whileInView,
      whileHover,
      transition,
      viewport,
      style,
      ...props
    }: any) => <div {...props}>{children}</div>,
    h2: ({ children, variants, initial, animate, whileInView, transition, viewport, ...props }: any) => (
      <h2 {...props}>{children}</h2>
    ),
    h3: ({ children, variants, initial, animate, whileInView, transition, viewport, ...props }: any) => (
      <h3 {...props}>{children}</h3>
    ),
    span: ({
      children,
      variants,
      initial,
      animate,
      whileInView,
      whileHover,
      transition,
      viewport,
      style,
      ...props
    }: any) => <span {...props}>{children}</span>,
  }
  return {
    motion: motionMock,
    m: motionMock,
  }
})

describe('Skills', () => {
  it('renders skills section', () => {
    render(<Skills />)
    // Query the section's own heading, not free text: the skill tags come from the
    // resume gist, and any tag containing "skills" made a bare /skills/i ambiguous.
    expect(screen.getByRole('heading', { level: 2, name: /technical expertise/i })).toBeInTheDocument()
  })

  it('renders section with correct id', () => {
    const { container } = render(<Skills />)
    const section = container.querySelector('section#skills')
    expect(section).toBeInTheDocument()
  })
})
