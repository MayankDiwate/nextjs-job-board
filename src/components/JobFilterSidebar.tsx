import { jobTypes } from "@/lib/job-types";
import { JobFilterValues, jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import prisma from "../lib/prisma";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";

const filterJobs = async (formData: FormData) => {
  "use server";

  const values = Object.fromEntries(formData.entries());
  const { q, type, location, remote } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${searchParams.toString()}`);
};

type JobFilterSidebarProps = {
  defaultValues: JobFilterValues;
};

const JobFilterSidebar = async ({ defaultValues }: JobFilterSidebarProps) => {
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <aside className="sticky top-4 h-fit rounded-lg border bg-background md:w-[260px]">
      <form action={filterJobs}>
        <div className="space-y-4 p-4">
          <div className="flex flex-col gap-2">
            <Label>Search</Label>
            <Input
              id="q"
              name="q"
              placeholder="Title, Company, etc."
              defaultValue={defaultValues.q}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 pb-2">
              <Label htmlFor="type">Type</Label>
              <Select
                id="type"
                name="type"
                defaultValue={defaultValues.type || ""}
              >
                <option value="">All types</option>
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </div>
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValues.location || ""}
            >
              <option value="">All locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="ml-0.5 flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote-jobs">Remote jobs</Label>
          </div>
          <Button type="submit" className="w-full">
            Filter jobs
          </Button>
        </div>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;
