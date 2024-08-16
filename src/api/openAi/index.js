import OpenAI from "openai";
import {OpenAi} from "@/api/config.json"

const openai = new OpenAI({
    organization: OpenAi.organization,
    project: OpenAi.project,
});