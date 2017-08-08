xAPI Profile Matching
==================

This is a Javascript library for xAPI profile matching. The `matches` function takes a statement array and a pattern tuple. 


This table summarizes the possible return values of `matches` and what they indicate:

outcome | remaining statements | outcome
------- | -------------------- | -------
true    | empty                | Pattern validates for these Statements
true    | non empty            | Pattern matches some of the Statements, but not all
partial | empty                | Pattern was in the middle of matching and ran out of Statements
partial | non empty            | outcome could be interpreted as success with non empty remaining, but Pattern could also continue matching
false   | original statements  | Pattern failed to match Statements. Note: if an optional or zeroOrMore Pattern is directly inside an alternates Pattern, it is possible for failure to be returned when partial is correct, due to decidability issues.

## License
   Copyright &copy;2016 Advanced Distributed Learning

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.