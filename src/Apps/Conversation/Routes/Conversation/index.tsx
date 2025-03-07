import { useState } from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { Box, Flex, breakpoints } from "@artsy/palette"
import { Match } from "found"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

import { ConversationPaginationContainer as Conversation } from "Apps/Conversation/Components/Conversation"
import { ConversationListPaginationContainer as ConversationList } from "Apps/Conversation/Components/ConversationList"
import { Conversation_me$data } from "__generated__/Conversation_me.graphql"
import { DetailsSidebarFragmentContainer } from "Apps/Conversation/Components/DetailsSidebar"
import {
  MOBILE_LOGGED_IN_NAV_HEIGHT,
  DESKTOP_NAV_BAR_HEIGHT,
} from "Components/NavBar/constants"
import { MetaTags } from "Components/MetaTags"
const LARGE_SCREEN_CONVERSATION_LIST_WIDTH = "375px"

interface ConversationRouteProps {
  me: Conversation_me$data
  conversationID: string
  match: Match
  relay: RelayRefetchProp
}

const ConstrainedHeightContainer = styled(Box)`
  height: calc(100vh - ${DESKTOP_NAV_BAR_HEIGHT}px);
  @media ${themeGet("mediaQueries.xs")} {
    height: calc(100vh - ${MOBILE_LOGGED_IN_NAV_HEIGHT}px);
  }
`

const ConversationContainer = styled(Flex)`
  height: 100%;
  & > * {
    overflow-x: hidden;
    overflow-y: auto;
  }
  & > .fresnel-greaterThan-sm {
    flex-shrink: 0;
  }
`

const ConversationListWrapper = styled(Box)`
  height: 100%;
  display: none;
  @media (min-width: ${breakpoints.md}) {
    display: initial;
    flex: 0 0 ${LARGE_SCREEN_CONVERSATION_LIST_WIDTH};
    border-right: 1px solid ${themeGet("colors.black10")};
  }
`

export const ConversationRoute: React.FC<ConversationRouteProps> = props => {
  const { me } = props
  const [showDetails, setShowDetails] = useState(false)
  return (
    <>
      <MetaTags title="Inbox | Artsy" />

      <ConstrainedHeightContainer>
        <ConversationContainer>
          <ConversationListWrapper>
            <ConversationList
              me={me as any}
              selectedConversationID={me?.conversation?.internalID ?? ""}
            />
          </ConversationListWrapper>
          <Conversation
            conversation={me.conversation!}
            showDetails={showDetails}
            setShowDetails={setShowDetails}
            refetch={props.relay.refetch}
          />
          <DetailsSidebarFragmentContainer
            conversation={me.conversation!}
            showDetails={showDetails}
            setShowDetails={setShowDetails}
          />
        </ConversationContainer>
      </ConstrainedHeightContainer>
    </>
  )
}

export const ConversationPaginationContainer = createRefetchContainer(
  ConversationRoute,
  {
    me: graphql`
      fragment Conversation_me on Me
        @argumentDefinitions(conversationID: { type: "String!" }) {
        ...ConversationList_me
        conversation(id: $conversationID) {
          internalID
          ...Conversation_conversation
          ...ConversationCTA_conversation
          ...DetailsSidebar_conversation
        }
      }
    `,
  },
  graphql`
    query ConversationPageQuery($conversationID: String!) {
      me {
        ...Conversation_me @arguments(conversationID: $conversationID)
      }
    }
  `
)
