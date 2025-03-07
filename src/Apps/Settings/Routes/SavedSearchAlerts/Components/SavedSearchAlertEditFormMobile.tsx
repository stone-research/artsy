import { ModalDialog, Spacer } from "@artsy/palette"
import { EditAlertFormBase } from "Apps/Settings/Routes/SavedSearchAlerts/types"
import { SavedSearchAlertEditFormQueryRenderer } from "./SavedSearchAlertEditForm"
import { useFeatureFlag } from "System/useFeatureFlag"

export const SavedSearchAlertEditFormMobile: React.FC<EditAlertFormBase> = ({
  editAlertEntity,
  onCloseClick,
  onDeleteClick,
  onCompleted,
}) => {
  const isFallbackToGeneratedAlertNamesEnabled = useFeatureFlag(
    "onyx_force-fallback-to-generated-alert-names"
  )

  return (
    <ModalDialog
      title={`Edit ${
        isFallbackToGeneratedAlertNamesEnabled ? "Alert" : editAlertEntity.name
      }`}
      m={0}
      dialogProps={{
        width: "100%",
        height: "100%",
      }}
      onClose={onCloseClick}
    >
      <Spacer y={4} />
      <SavedSearchAlertEditFormQueryRenderer
        editAlertEntity={editAlertEntity}
        onDeleteClick={onDeleteClick}
        onCompleted={onCompleted}
      />
    </ModalDialog>
  )
}
