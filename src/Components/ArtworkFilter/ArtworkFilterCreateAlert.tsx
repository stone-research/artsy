import { ContextModule, Intent } from "@artsy/cohesion"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { usePrepareFiltersForPills } from "Components/ArtworkFilter/Utils/usePrepareFiltersForPills"
import { ProgressiveOnboardingAlertCreate } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertCreate"
import { ProgressiveOnboardingAlertReady } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertReady"
import { SavedSearchCreateAlertButtonContainer } from "Components/SavedSearchAlert/Components/SavedSearchCreateAlertButtonContainer"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { getSearchCriteriaFromFilters } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { DEFAULT_METRIC } from "Utils/metrics"
import { isEmpty } from "lodash"
import { FC } from "react"

interface ArtworkFilterCreateAlertProps {
  renderButton: (props: { onClick: () => void }) => JSX.Element
}

export const ArtworkFilterCreateAlert: FC<ArtworkFilterCreateAlertProps> = ({
  renderButton,
}) => {
  const { entity } = useSavedSearchAlertContext()
  const { aggregations } = useArtworkFilterContext()
  const filters = usePrepareFiltersForPills()

  // If there is no entity then we don't want to create an alert
  if (isEmpty(entity)) return null

  const criteria = getSearchCriteriaFromFilters(entity, filters)
  const metric = filters?.metric ?? DEFAULT_METRIC

  return (
    <SavedSearchCreateAlertButtonContainer
      entity={entity}
      criteria={criteria}
      metric={metric}
      aggregations={aggregations}
      authDialogOptions={{
        options: {
          title: "Sign up to create your alert",
          afterAuthAction: {
            action: "createAlert",
            kind: "artworks",
            objectId: entity.owner.slug,
          },
        },
        analytics: {
          contextModule: ContextModule.artworkGrid,
          intent: Intent.createAlert,
        },
      }}
      renderButton={({ onClick }) => (
        <ProgressiveOnboardingAlertCreate>
          {({ onSkip: createSkip }) => (
            <ProgressiveOnboardingAlertReady>
              {({ onSkip: readySkip }) =>
                renderButton({
                  onClick: () => {
                    createSkip()
                    readySkip()
                    onClick()
                  },
                })
              }
            </ProgressiveOnboardingAlertReady>
          )}
        </ProgressiveOnboardingAlertCreate>
      )}
    />
  )
}
