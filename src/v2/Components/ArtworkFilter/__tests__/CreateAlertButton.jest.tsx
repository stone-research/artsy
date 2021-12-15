import { render, screen, within, fireEvent } from "@testing-library/react"
import { useSystemContext } from "v2/System/useSystemContext"
import { useTracking } from "v2/System/Analytics/useTracking"
import * as openAuthModal from "v2/Utils/openAuthModal"
import { SavedSearchAttributes } from "v2/Components/ArtworkFilter/SavedSearch/types"
import { ExtractProps } from "v2/Utils/ExtractProps"
import { CreateAlertButton } from "../SavedSearch/Components/CreateAlertButton"
import { mediator } from "lib/mediator"

jest.mock("v2/System/useSystemContext")
jest.mock("v2/System/Analytics/useTracking")

const savedSearchAttributes: SavedSearchAttributes = {
  type: "artist",
  id: "test-artist-id",
  name: "test-artist-name",
  slug: "example-slug",
}

describe("CreateAlertButton", () => {
  const renderButton = () => {
    render(
      <CreateAlertButtonTest savedSearchAttributes={savedSearchAttributes} />
    )
  }

  const CreateAlertButtonTest = (
    props: ExtractProps<typeof CreateAlertButton>
  ) => {
    return <CreateAlertButton {...props} />
  }

  const openAuthToFollowSaveCreate = jest.spyOn(
    openAuthModal,
    "openAuthToFollowSaveCreate"
  )

  const trackEvent = jest.fn()

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    trackEvent.mockReset()
  })

  it("renders correctly", () => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => {
      return {
        isLoggedIn: true,
      }
    })
    renderButton()
    expect(screen.getByText("Create an Alert")).toBeInTheDocument()
  })

  describe("when logged in", () => {
    beforeEach(() => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => {
        return {
          isLoggedIn: true,
        }
      })
    })

    it("pops up the Create an Alert modal when clicked", () => {
      renderButton()
      expect(
        within(screen.getByRole("form")).queryByText("Create an Alert")
      ).not.toBeInTheDocument()
      const button = screen.getByText("Create an Alert")
      fireEvent.click(button)
      expect(
        within(screen.getByRole("form")).getByText("Create an Alert")
      ).toBeInTheDocument()
    })

    it("tracks event", () => {
      renderButton()
      const button = screen.getByText("Create an Alert")
      fireEvent.click(button)
      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "clickedCreateAlert",
          context_page_owner_type: "artist",
          context_page_owner_id: "test-artist-id",
          context_page_owner_slug: "example-slug",
        })
      )
    })
  })

  describe("when logged out", () => {
    beforeEach(() => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => {
        return {
          isLoggedIn: false,
        }
      })
    })

    it("pops up the auth modal when clicked", () => {
      renderButton()
      const button = screen.getByText("Create an Alert")
      fireEvent.click(button)
      expect(openAuthToFollowSaveCreate).toHaveBeenCalledWith(mediator, {
        entity: {
          name: "test-artist-name",
          slug: "example-slug",
        },
        contextModule: "artworkGrid",
        intent: "createAlert",
      })
    })
  })
})
