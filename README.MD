# Instaclone

Instaclone Backend.

## User

- [x] Create Account
- [x] See Profile
- [x] Login
- [x] Edit Profile
- [x] Change Avatar (Image Upload)
- [x] Follow User
- [x] Unfollow User
- [x] See Followers and See Following w/ Pagination
- [x] Computed Fields
- [x] Search Users

## Photos

- [ ] Upload Photo (Parse #)
- [ ] See Photo
- [ ] See Hashtag
- [ ] Search Photos
- [ ] Edit Photo
- [ ] Like / Unlike Photo
- [ ] See Photo Likes
- [ ] See Feed
- [ ] See Photo Comments
- [ ] Delete Photo

## Note

### #4.15
- Playground 대신 Altair Tool 사용
https://altair.sirmuel.design/

### #4.23 - 4.25
- https://www.prisma.io/docs/concepts/components/prisma-client/pagination

- Offset pagination (seeFollowers)
- Cursor-based pagination (seeFollowing): 무제한 스크롤 사용 시 유용

### #4.26 - 4.28
- Computed Fields: GraphQL schema에는 있지만 database에는 없음. 매 요청 시마다 계산됨.