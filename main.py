import jwt
import datetime
import uuid
connectedAppClientId = '2785c5bf-3faa-45ff-bdaf-9df5b6a63de7'
user = 'pakpoom.s@transcode.co.th'
connectedAppSecretKey = '0a951f2b-264d-44d1-b9de-2413e3f15b40'
connectedAppSecretId = 'l1ZFO8mvFMK6kGJJSV+brq2xCTajYDRgRhnRLQQC0Tk='
token = jwt.encode(
	{
		"iss": connectedAppClientId,
		"exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=5),
		"jti": str(uuid.uuid4()),
		"aud": "tableau",
		"sub": user,
		"scp": ["tableau:views:embed", "tableau:metrics:embed"]
,
"https://tableau.com/oda":"true",
"https://tableau.com/groups": ["Contractors", "Team C", "Group1", "Group2"],
"Region": "East"

	},
		connectedAppSecretKey,
		algorithm = "HS256",
		headers = {
		'kid': connectedAppSecretId,
		'iss': connectedAppClientId
        }
  )

print(token)