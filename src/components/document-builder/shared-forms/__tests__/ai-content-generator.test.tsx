import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import AIContentGenerator from '@/components/document-builder/shared-forms/ai-content-generator'
import { ResumeContext } from '@/lib/contexts/document-context'
import { useAISettings } from '@/lib/contexts/ai-settings-context'
import { generateSummaryGraph, generateCoverLetterGraph, tailorExperienceToJDGraph } from '@/lib/ai/strands/agent'

// Mock dependencies
jest.mock('@/lib/contexts/ai-settings-context')
jest.mock('@/lib/ai/strands/agent')
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    dismiss: jest.fn(),
  },
}))
jest.mock('@/lib/analytics', () => ({
  analytics: {
    aiGenerationSuccess: jest.fn(),
    aiGenerationError: jest.fn(),
  },
}))
jest.mock('@/components/ui/ai-action-button', () => ({
  __esModule: true,
  default: ({ onClick, label }: { onClick: () => void; label: string }) => (
    <button onClick={onClick} aria-label={label}>
      {label}
    </button>
  ),
}))

describe('AIContentGenerator', () => {
  const mockResumeData = { summary: '', content: '', workExperience: [] }
  const mockAISettings = {
    settings: {
      apiUrl: 'http://api.test',
      apiKey: 'test-key',
      model: 'test-model',
      providerType: 'openai',
      jobDescription: 'test jd',
    },
    isConfigured: true,
    isAnyAIActionActive: false,
    setIsAnyAIActionActive: jest.fn(),
  }

  const defaultProps = {
    name: 'test-field',
    value: 'old value',
    onChange: jest.fn(),
    onGenerated: jest.fn(),
    mode: 'summary' as const,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAISettings as jest.Mock).mockReturnValue(mockAISettings)
    ;(generateSummaryGraph as jest.Mock).mockResolvedValue('Generated summary content')
    ;(generateCoverLetterGraph as jest.Mock).mockResolvedValue('Generated cover letter content')
    ;(tailorExperienceToJDGraph as jest.Mock).mockResolvedValue({
      description: 'Tailored description',
      achievements: ['A1'],
      techStack: ['Node.js'],
    })
  })

  const renderComponent = (props = {}) => {
    return render(
      <ResumeContext.Provider value={{ resumeData: mockResumeData } as any}>
        <AIContentGenerator {...defaultProps} {...props} />
      </ResumeContext.Provider>
    )
  }

  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByLabelText('Professional Summary')).toBeInTheDocument()
  })

  it('generates summary', async () => {
    renderComponent()
    fireEvent.click(screen.getByRole('button', { name: /Generate by JD/i }))
    await waitFor(() => expect(generateSummaryGraph).toHaveBeenCalled())
  })

  it('handles onChange with event', () => {
    renderComponent()
    const textarea = screen.getByLabelText('Professional Summary')
    fireEvent.change(textarea, { target: { value: 'New value' } })
    expect(defaultProps.onChange).toHaveBeenCalled()
  })

  it('generates a cover letter via the cloud path', async () => {
    renderComponent({ mode: 'coverLetter' })
    fireEvent.click(screen.getByRole('button', { name: /Generate by JD/i }))
    await waitFor(() => expect(generateCoverLetterGraph).toHaveBeenCalled())
  })
})
