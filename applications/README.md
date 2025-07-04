# Job Applications

This folder contains job application submissions in JSON format.

Each file represents one job application with the following naming convention:
`application_[ID]_[DATE].json`

## File Structure

- `id`: Unique application identifier
- `submittedAt`: ISO timestamp when submitted
- `preferredName`: Applicant's preferred name
- `discordUser`: Discord username
- `team`: Team they're applying for
- `specificRole`: Specific role/position
- `portfolio`: Portfolio URL (optional)
- `generalDetails`: About the applicant
- `sceneWriting`: Writing sample (for writing team)
- `additionalLinks`: Additional links/work
- `termsAgree`: Agreement to terms
- `submissionDetails`: Browser/system info for debugging

Applications are automatically created when users submit the job application form.
