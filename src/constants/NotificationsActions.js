// connection_send: "friend request send",
// connection_accepted: "friend request accepted",
// connection_reject: "Connection Request Deleted",
// connection_pending: "friend request already Send",
// connection_remove: "Connection is removed",
export const notifications = [
  {
    id: 1,
    name: "All",
    type: "all",
    isSeleted: true
  },
  {
    id: 2,
    name: "Follow",
    type: "follow_request",
    isSeleted: false
  },
  {
    id: 3,
    name: "Mention/Tag",
    type: "post_mention",
    isSeleted: false
  },
  {
    id: 4,
    name: "Live Stream",
    type: "live_stream",
    isSeleted: false
  },
  {
    id: 5,
    name: "Strain Hit",
    type: "strain_hit",
    isSeleted: false
  },
  {
    id: 6,
    name: "Friend Request",
    type: "connection_request",
    isSeleted: false
  },
  {
    id: 7,
    name: "Connection Accept",
    type: "connection_successful",
    isSeleted: false
  },
  {
    id: 8,
    name: "Check In",
    type: "check_in",
    isSeleted: false
  }
]
