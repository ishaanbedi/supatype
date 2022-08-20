
import { getWords } from '../../utils/words'

console.log(getWords)

export default function handler (req, res) {
  res.status(200).json(getWords())
}
