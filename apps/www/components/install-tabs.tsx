import { registryNamespace } from "@/lib/registry"
import { CodeTabs } from "@/components/docs/code-tabs"
import { ComponentSource } from "@/components/docs/component-source"
import { Step, Steps } from "@/components/docs/steps"
import { RegistrySource } from "@/components/mdx/component-source"
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// The Installation section every component page shares: the CLI command,
// and under Manual the npm dependencies plus the file itself.
export function InstallTabs({
  name,
  dependencies = [],
  file,
}: {
  name: string
  dependencies?: string[]
  file: string
}) {
  return (
    <CodeTabs>
      <TabsList variant="line">
        <TabsTrigger value="cli">Command</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>
      <TabsContent value="cli">
        <ComponentSource
          code={`npx shadcn@latest add ${registryNamespace}/${name}`}
          language="bash"
          collapsible={false}
        />
      </TabsContent>
      <TabsContent value="manual">
        <Steps>
          {dependencies.length ? (
            <>
              <Step>Install the dependencies.</Step>
              <ComponentSource
                code={`npm install ${dependencies.join(" ")}`}
                language="bash"
                collapsible={false}
              />
            </>
          ) : null}
          <Step>Copy the component into your project.</Step>
          <RegistrySource name={name} title={file} />
          <Step>Import the design layer.</Step>
          <p className="mt-(--typeset-flow) text-copy-16 text-gray-900">
            The component speaks ramp vocabulary; those utilities come from{" "}
            <code>@ziiz/theme/theme.css</code>. See Installation.
          </p>
        </Steps>
      </TabsContent>
    </CodeTabs>
  )
}
