import { BoxProps, Flex, Text, Avatar } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { GeneEntityHeader_gene } from "v2/__generated__/GeneEntityHeader_gene.graphql"
import { FollowGeneButtonFragmentContainer } from "../FollowButton/FollowGeneButton"

export interface GeneEntityHeaderProps extends BoxProps {
  gene: GeneEntityHeader_gene
  displayAvatar?: boolean
  displayLink?: boolean
  FollowButton?: JSX.Element
}

const GeneEntityHeader: FC<GeneEntityHeaderProps> = ({
  gene,
  displayAvatar = true,
  displayLink = true,
  FollowButton,
  ...rest
}) => {
  const image = gene.avatar?.cropped
  const initials = gene.name?.[0]
  const total = gene.filterArtworksConnection?.counts?.total ?? 0
  const meta = total > 0 ? `${total.toLocaleString("en-US")} artworks` : null

  return (
    <Flex
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      <Flex
        {...(displayLink
          ? { as: RouterLink, to: gene.href, textDecoration: "none" }
          : {})}
        display="flex"
        alignItems="center"
        minWidth={0}
        flex={1}
      >
        {displayAvatar && (image || initials) && (
          <Avatar size="xs" mr={1} initials={initials} lazyLoad {...image} />
        )}

        <Flex flexDirection="column" mr={1} flex={1} overflow="hidden">
          <Text variant="md" lineClamp={2}>
            {gene.name ?? "Unknown"}
          </Text>

          {meta && (
            <Text variant="xs" color="black60" overflowEllipsis>
              {meta}
            </Text>
          )}
        </Flex>
      </Flex>

      {FollowButton || (
        <FollowGeneButtonFragmentContainer
          gene={gene}
          size="small"
          variant="secondaryOutline"
        />
      )}
    </Flex>
  )
}

export const GeneEntityHeaderFragmentContainer = createFragmentContainer(
  GeneEntityHeader,
  {
    gene: graphql`
      fragment GeneEntityHeader_gene on Gene {
        ...FollowGeneButton_gene
        internalID
        href
        name
        avatar: image {
          cropped(width: 45, height: 45, version: ["big_and_tall", "tall"]) {
            src
            srcSet
          }
        }
        filterArtworksConnection(first: 1) {
          counts {
            total
          }
        }
      }
    `,
  }
)
