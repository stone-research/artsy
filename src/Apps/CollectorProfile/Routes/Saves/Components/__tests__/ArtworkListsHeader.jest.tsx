import { render, screen, fireEvent } from "@testing-library/react"
import { ArtworkListsHeader } from "Apps/CollectorProfile/Routes/Saves/Components/ArtworkListsHeader"

describe("ArtworkListsHeader", () => {
  it("renders header text and creates button", () => {
    render(<ArtworkListsHeader savedArtworksCount={0} />)

    const title = "Saves"
    const description = "Curate your own lists of the works you love"

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it("opens the 'Create a new list' modal", () => {
    render(<ArtworkListsHeader savedArtworksCount={0} />)

    const button = screen.getByText("Create New List")
    fireEvent.click(button)

    expect(screen.getByTestId("CreateNewList")).toBeInTheDocument()
  })
})
