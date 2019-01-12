# pwad.org.au

Public Worship and Aids to Devotion Website

## Models

### User

- `name: Name`
- `email: Email`
  `required`
  `unique`
- `profilePhoto: Url`
- `googleProviderId: Text`
  `noedit`
- `password: Password`


#### User.Permissions
- `isProtected: Boolean`
  `noedit`
  
### Transaction

### 

## static.pwad.org.au

For static files (and website?)
  - PDF of Pray
  - PDF of Rejoice
  - PWAD pdf papers
  - Committee page
	- ...etc - extracted from existing sites
  
AWS S3 backend
  - signed URLs?
  - storing indexed files

## auth.pwad.org.au

For authentication and access control
  - Committee users
  - Administrator users

ACL options
  - [access-control](https://github.com/bluebirds-blue-jay/access-control)
  - [accesscontrol](https://github.com/onury/accesscontrol)

## search.pwad.org.au

For search
  - Hymns
  - Services
  - Search All

Public Users
  - ability to *search* items by Keyword, Title, Bible verse, Tune, First line or Context
  
Search index created from uploaded files

Index options
  - mongodb?
  - dynamodb?
  - elastic?
  
## graphql.pwad.org.au

For site content
  - [keystone](http://keystonejs.com/)
  - [apollo-graphql](https://www.apollographql.com/)
  - [mongo atlas](https://www.mongodb.com/cloud/atlas)
  
Handle indexing and storage of uploaded files

Committee Users
  - Logins (username and passwords) for Committee who do the tagging and adding
  - A Super-user who can manage these logins
  - ability to *add* items by Keyword, Title, Bible verse, Tune, First line or Context
  - ability to *tag* items by Keyword, Title, Bible verse, Tune, First line or Context

Glossary
  - Context = Liturgical context eg "Call to Worship", "Praise" 
  - Keyword = thematic keywords eg "Repentance", "Judgement"
  - Bible verse = Bible reference eg "1 John 1:1" 
  - Tune = Tune eg "Greensleeves" 
  - Title = eg "Prayer of Confession", "Immortal, Invisible" 
  - First line = first line of the item
