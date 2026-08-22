import PasswordProtection from '@/components/auth/password-protection'
import { OnboardingTour } from '@/components/onboarding/onboarding-wrapper'
import { UnifiedEditor } from '@/components/resume/forms/unified-editor'
import '@/styles/document-builder.css'
import '@/styles/resume-preview.css'

export default function ResumeBuilder() {
  return (
    <PasswordProtection>
      <OnboardingTour>
        <UnifiedEditor />
      </OnboardingTour>
    </PasswordProtection>
  )
}
