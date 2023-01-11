import { Button, useToasts } from "@artsy/palette"
import { t } from "i18next"
import { FC, useState } from "react"
import { graphql } from "react-relay"
import { useSystemContext } from "System"
import { useMutation } from "Utils/Hooks/useMutation"

interface TriggerCampaignButtonProps {
  text: string
  campaignID: string
}

// This button can be used for any email campaign that is triggered by a button click.
export const TriggerCampaignButton: FC<TriggerCampaignButtonProps> = ({
  text,
  campaignID,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useSystemContext()
  const { sendToast } = useToasts()

  const { submitMutation } = useMutation({
    mutation: graphql`
      mutation TriggerCampaignButtonMutation($input: TriggerCampaignInput!) {
        triggerCampaign(input: $input) {
          clientMutationId
        }
      }
    `,
  })

  const handleClick = async () => {
    try {
      setIsLoading(true)

      await submitMutation({
        variables: {
          input: {
            campaignID: campaignID,
          },
        },
      })
      sendToast({
        variant: "success",
        message: t("toast.emails.emailSuccess", { email: user?.email }),
      })

      setIsLoading(false)
    } catch (error) {
      sendToast({
        variant: "error",
        message: t("toast.emails.emailError"),
      })

      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="secondaryBlack"
      size={["small", "large"]}
      onClick={handleClick}
      loading={isLoading}
    >
      {text}
    </Button>
  )
}
