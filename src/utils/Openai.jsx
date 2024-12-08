import OpenAI from 'openai';
import { aikey } from './Constant';

const client = new OpenAI({
  apiKey: aikey, // This is the default and can be omitted
});

export default OpenAI